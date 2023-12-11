const knex = require('../database/connection');

const clientRegister = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

  try {
    const queryEmail = await knex('clientes').where({ email }).first()
    const queryCPF = await knex('clientes').where({ cpf }).first()

    if(queryCPF || queryEmail) {
      return res.status(400).json({ message: 'Já existe cliente cadastrado com o e-mail ou cpf informado.' });
    }

    const register = await knex('clientes')
    .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
    .returning('*')

    return res.status(201).json(register)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
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