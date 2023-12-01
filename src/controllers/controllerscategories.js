const knex = require('../database/connection');

const listCategories = async (req, res) => {
    try {
        const categories = await knex('categorias').select('*');

        if (categories.length === 0) {
            return res.status(204).json([]);
        }

        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

module.exports = {
    listCategories
};
