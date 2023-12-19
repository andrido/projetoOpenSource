const knex = require('../database/connection');
const storage = require('../service/storage')


const productRegister = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { file } = req

    try {
        const productRepetition = await knex('produtos').where({ descricao }).count().returning('*')

        if (productRepetition[0].count > 0) {
            return res.status(404).json({ message: `O produto ${descricao} já existe no registro` })
        }

        const existentCategory = await knex('categorias').where({ id: categoria_id }).count().returning('*')
        if (Number(existentCategory[0].count) === 0) {
            return res.status(400).json({ message: `Não foi possível encontrar categoria com o ID:${categoria_id}` })
        }

        if (file) {
            const uploadResult = await storage.uploadFile(file)

            const queryInsertProduct = await knex('produtos').insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                produto_imagem: uploadResult.Location

            }).returning('*')
            return res.status(201).json(queryInsertProduct[0])
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

const editProduct = async (req, res) => {

    const { id } = req.params
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { file } = req


    try {
        const validateID = await knex('produtos').where({ id }).count()

        if (validateID[0].count === 0) {
            return res.status(404).json({ message: `O ID: ${id} não existe` })
        }

        const existentCategory = await knex('categorias').where({ id: categoria_id }).count().returning('*')

        if (existentCategory[0].count === 0) {
            return res.status(404).json({ message: `Não foi possível encontrar categoria com esse ID` })
        }

        const productRepetition = await knex('produtos').where({ descricao }).count().returning('*')

        if (productRepetition[0].count > 0) {
            return res.status(404).json({ message: `O produto ${descricao} já existe no registro` })
        }

        if (file) {
            const deleteImage = await knex('produtos').select('produto_imagem').where({ id })
            const pathIsNull = await knex('produtos').select('produto_imagem').where('produto_imagem', null).andWhere({ id });
        
            if (pathIsNull) {
                const uploadResult = await storage.uploadFile(file)

                const queryEditProduct = await knex('produtos').update({
                    descricao,
                    quantidade_estoque,
                    valor,
                    categoria_id,
                    produto_imagem: uploadResult.Location
                }).where({ id }).returning('*')

                return res.status(200).json(queryEditProduct[0])
            } 

            await storage.deleteFile(deleteImage)
            const uploadResult = await storage.uploadFile(file)

            const queryEditProduct = await knex('produtos').update({
                    descricao,
                    quantidade_estoque,
                    valor,
                    categoria_id,
                    produto_imagem: uploadResult.Location
            }).where({ id }).returning('*')

            return res.status(200).json(queryEditProduct[0])
        }

        const queryEdit = await knex('produtos').update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
            produto_imagem: null

        }).where({ id }).returning('*')

        return res.status(200).json(queryEdit[0])

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const productListing = async (req, res) => {
    const { filtro } = req.query;
    try {

        const queryListing = await knex('produtos').returning('*')

        if (queryListing.length === 0) {
            return res.status(404).json({ message: 'Nenhum produto encontrado!' })
        }

        const queryCategories = await knex('produtos as p')
            .select('p.id', 'p.descricao', 'p.quantidade_estoque', 'p.valor', 'p.categoria_id', 'c.descricao as categoria_descricao')
            .innerJoin('categorias as c', 'c.id', 'p.categoria_id')
            .orderBy('id');

        if (filtro) {
            const filterCategories = queryCategories.filter((el) => {
                const existentCategory = filtro.includes(String(el.categoria_id))
                if (existentCategory) {
                    return el;
                }
            })

            if (filterCategories.length === 0) {
                return res.status(404).json({ message: 'Nenhum produto encontrado!' })
            }

            return res.status(200).json(filterCategories)
        }
        return res.status(200).json(queryCategories)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



const detailProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await knex('produtos').where({ id }).first();

        if (!product) {
            return res.status(404).json({ message: `Produto com id ${id} não encontrado` })
        }

        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }

}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await knex('produtos').where({ id }).first()

        if (!product) {
            return res.status(404).json({ message: `Produto com id ${id} não encontrado.` })
        }

        const findProduct = await knex('pedido_produtos').where('produto_id', '=', id).first()

        if (findProduct) {
            return res.status(404).json({ message: 'Não é possível deletar um produto que está cadastrado em um ou mais pedidos.' })
        }

        const queryImageNull = await knex('produtos').select('produto_imagem').where('produto_imagem', null).andWhere({ id })

        if(queryImageNull){
            await knex('produtos').where({ id }).del()
            return res.status(204).json()
        }

        const deleteImage = await knex('produtos').select('produto_imagem').where({ id })

        await storage.deleteFile(deleteImage)
        
        await knex('produtos').where({ id }).del()

        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor!' });
    }
}


module.exports = {
    productRegister,
    productListing,
    detailProduct,
    deleteProduct,
    editProduct
}