const knex = require('../database/connection');
const enviarEmail = require('../service/nodemailer');

const orderRegister = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    try {
        if (!cliente_id || !pedido_produtos || pedido_produtos.length === 0) {
            return res.status(400).json({ message: 'Os campos cliente_id e pedido_produtos são obrigatórios' });
        }

        const clienteExistente = await knex('clientes').select('*').where({ id: cliente_id }).first();

        if (!clienteExistente) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }

        for (const produtoPedido of pedido_produtos) {
            const { produto_id, quantidade_produto } = produtoPedido;
            const produtoExistente = await knex('produtos').select('*').where({ id: produto_id }).first();

            if (!produtoExistente) {
                return res.status(404).json({ message: `Produto com ID ${produto_id} não encontrado.` });
            }

            if (quantidade_produto > produtoExistente.quantidade_estoque) {
                return res.status(400).json({ message: `Quantidade em estoque insuficiente para o produto ${produto_id}.` });
            }
        }

        const valor_total = pedido_produtos.reduce((total, produto) => {
            const produtoExistente = pedido_produtos.find(p => p.produto_id === produto.produto_id);
            return total + produtoExistente.quantidade_produto * produtoExistente.valor_produto;
        }, 0);


        const [pedido] = await knex('pedidos')
            .insert({
                cliente_id,
                observacao,
                valor_total,
            })
            .returning(['id', 'cliente_id', 'observacao', 'valor_total']);


        const pedidoProdutosInsert = pedido_produtos.map(produto => ({
            pedido_id: pedido.id,
            produto_id: produto.produto_id,
            quantidade_produto: produto.quantidade_produto,
            valor_produto: produto.valor_produto,
        }));


        await knex('pedido_produtos').insert(pedidoProdutosInsert);


        for (const produtoPedido of pedido_produtos) {
            await knex('produtos')
                .where({ id: produtoPedido.produto_id })
                .decrement('quantidade_estoque', produtoPedido.quantidade_produto);
        }

        const clienteEmail = clienteExistente.email;
        await enviarEmail(clienteEmail, 'Confirmação de Pedido', 'Seu pedido foi efetuado com sucesso! Obrigado pela sua compra.');

        return res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso.' });
    } catch (error) {

        return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};

module.exports = {
    orderRegister
}
