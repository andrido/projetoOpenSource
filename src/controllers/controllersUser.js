const knex = require('../database/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const passwordEncrypted = await bcrypt.hash(senha, 10)
        const validateEmail = await knex('usuarios').select('*').where({ email })

        if (validateEmail[0]?.email) {
            return res.status(400).json({ message: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const register = await knex('usuarios').insert({
            nome,
            email,
            senha: passwordEncrypted,
        }).returning(['id', 'nome', 'email'])

        return res.status(201).json(register[0])
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const ExistentUser = await knex('usuarios').where({ email: email }).first()

        if(!ExistentUser) {
            return res.status(400).json({ message: "E-mail ou senha inválida" })
        }

        const correctPassword = await bcrypt.compare(senha, ExistentUser.senha)
        
        if (!correctPassword) {
            return res.status(400).json({ message: "E-mail ou senha inválida" })
        }

        const token = jwt.sign({ sub: ExistentUser.id }, process.env.JWT_PASS, { expiresIn: '8h' })

        const { senha: _, ...user } = ExistentUser

        return res.status(200).json({
            user: user,
            token
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const userDetails = async (req, res) => {
    const { id } = req.user
    try {
        const queryDataBase = await knex('usuarios').select(['id', 'nome', 'email']).where({ id }).first()
        return res.json(queryDataBase)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const editUser = async (req, res) => {
    const { id } = req.user
    const { nome, email, senha } = req.body

    try {
        const passwordEncrypted = await bcrypt.hash(senha, 10)
        const validateEmail = await knex('usuarios').select('*').where({ email }).first()

        if (validateEmail) {
            return res.status(400).json({ message: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const updateUser = await knex('usuarios').where({ id }).update({ nome, email, senha: passwordEncrypted })

        return res.status(204).json(updateUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    registerUser,
    login,
    userDetails,
    editUser
}