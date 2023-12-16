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
            return res.status(404).json({ message: `Não foi possível encontrar categoria com o ID:${categoria_id}` })
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

    try {

        const validateID = await knex('produtos').where({ id })


        if (validateID.length === 0) {
            return res.status(400).json({ message: `O ID: ${id} não existe` })
        }

        const existentCategory = await knex('categorias').where({ id: categoria_id }).returning('*')

        if (existentCategory.length === 0) {
            return res.status(404).json({ message: `Não foi possível encontrar categoria com esse ID` })
        }

        const queryEdit = await knex('produtos').update({ descricao, quantidade_estoque, valor, categoria_id }).where({ id }).returning('*')

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
            return res.status(400).json({ message: `Produto com id ${id} não encontrado` })
        }

        res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }

}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await knex('produtos').where({ id }).first()

        if (!product) {
            return res.status(400).json({ message: `Produto com id ${id} não encontrado` })
        }

        const removeProduct = await knex('produtos').where({ id }).delete()

        return res.status(200).json({ message: 'Produto excluido!' })

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
}


module.exports = {
    productRegister,
    productListing,
    detailProduct,
    deleteProduct,
    editProduct
}