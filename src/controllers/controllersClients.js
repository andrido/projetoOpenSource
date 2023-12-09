const knex = require('../database/connection');

const clientRegister = (req, res) => {

}

const clientList = async (req, res) => {
    try {
        const list = await knex('clientes').returning('*')
        return res.status(200).json(list)

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

const clientDetail = (req, res) => {

}

const clientEdit = (req, res) => {

}

const clientDelete = (req, res) => {

}

module.exports = {
    clientRegister,
    clientList,
    clientDetail,
    clientEdit,
    clientDelete
}