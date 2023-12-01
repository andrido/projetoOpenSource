require('dotenv').config()
const jwt = require('jsonwebtoken')
const knex = require('../database/connection')

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }
    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.JWT_PASS)
        const generatorToken = await knex('usuarios').select('*').where({id}).debug()
        const generatorTokenCount = await knex('usuarios').select('*').where({id}).count().debug()


        if (generatorTokenCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não existe' })
        }
        const { password: _, ...user } = generatorToken
        req.user = user
        return next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }
}

module.exports = {
    validateToken
}