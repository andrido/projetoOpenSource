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

        const { senha: senhaUsuario, ...usuario } = ExistentUser[0]

        console.log(usuario)
        const senhaCorreta = await bcrypt.compare(password, senhaUsuario)

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: "E-mail ou senha inválida" })
        }


        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, { expiresIn: '8h' })
        return res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.mensage)

    }
}


module.exports = {
    registerUser,
    login

}