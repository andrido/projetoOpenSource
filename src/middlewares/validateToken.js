require('dotenv').config()
const jwt = require('jsonwebtoken')


const validateToken = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { sub } = jwt.verify(token, process.env.JWT_PASS)

        req.user = { id: sub }

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = { validateToken }
