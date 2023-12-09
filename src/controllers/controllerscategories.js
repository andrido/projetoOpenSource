const knex = require('../database/connection');
const { id } = require('../schemas/schemaUser');

const listCategories = async (req, res) => {

    const { id } = req.query

    try {
        if (id) {
            const categories = await knex('categorias').where({ id }).select('*')
            const resposta = categories.length !== 0 ? res.status(200).json(categories[0]) :
                res.status(404).json({ message: `Categoria com ID: ${id} não encontrada` })
            return resposta
        }

        const categories = await knex('categorias').select('*');
        if (categories.length === 0) {
            return res.status(404).json([]);
        }

        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

module.exports = {
    listCategories
};
