const knex = require('../database/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const passwordEncrypted = await bcrypt.hash(password, 10)
        const validateEmail = await knex('usuarios').select('*').where({ email })

        if (validateEmail[0]?.email) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const register = await knex('usuarios').insert({
            nome: name,
            email,
            senha: passwordEncrypted,
        }).returning('*')

        return res.status(201).json(register)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const ExistentUser = await knex('usuarios').where({ email: email }).returning('*')
        if (ExistentUser.length === 0) {
            return res.status(400).json({ mensagem: "E-mail ou senha inválida" })
        }

        const { senha: passwordUser, ...user } = ExistentUser[0]

        const correctPassword = await bcrypt.compare(password, passwordUser)

        if (!correctPassword) {
            return res.status(400).json({ mensagem: "E-mail ou senha inválida" })
        }

        const token = jwt.sign({ sub: user.id }, process.env.JWT_PASS, { expiresIn: '8h' })
        return res.json({
            user,
            token
        })

    } catch (error) {
        return res.status(500).json(error.mensage)
    }
}

const userDetails = async (req, res) => {
    const { id } = req.user
    try {
        const queryDataBase = await knex('usuarios').select(['id', 'nome', 'email']).where({ id }).first()
        return res.json(queryDataBase)
        
    } catch (error) {
        return res.status(500).json(error.mensage)
    }
}

const editUser = async (req, res) => {
    const { id } = req.user
    const { name, email, password } = req.body

    try {
        const passwordEncrypted = await bcrypt.hash(password, 10)
        const validateEmail = await knex('usuarios').select('*').where({ email })
        
        if (validateEmail[0]?.email) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const updateUser = await knex('usuarios').where({id}).update({nome:name, email:email, senha: passwordEncrypted})

        return res.status(201).json(updateUser)
    } catch (error) {
        return res.status(500).json(error.mensage)
    }
}

module.exports = {
    registerUser,
    login,
    userDetails,
    editUser
}