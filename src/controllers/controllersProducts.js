const knex = require('../database/connection');

const productRegister = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        const productRepetition = await knex('produtos').where({ descricao: descricao }).returning('*')

        if (productRepetition.length !== 0) {
            return res.status(404).json({ message: `O produto ${descricao} já existe no registro` })
        }

        const existentCategory = await knex('categorias').where({ id: categoria_id }).returning('*')

        if (existentCategory.length !== 1) {
            return res.status(404).json({ message: `Não foi possível encontrar categoria com o ID:${id}` })
        }

        const product = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*')

        return res.status(201).json(product[0])

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const productListing = async (req, res) => {
    try {
        const queryListing = await knex('produtos').returning('*')

        if (queryListing.length !== 0) {
            return res.status(400).json({ message: 'Nenhum produto encontrado!' })
        }

        return res.status(200).json(queryListing)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



const detailProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await knex('produtos').where({ id }).first();

        if (!product) {
            return res.status(400).json({ message: 'Produto com id ${id} não encontrado' })
        }

        res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }

}



module.exports = {
    productRegister,
    productListing,
    detailProduct
}