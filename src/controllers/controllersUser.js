const knex = require('../database/connection')
const bcrypt = require('bcrypt')

const registerUser = async (req,res)=>{
    const { name,email,password } = req.body
    
    try {

        const passwordEncrypted = await bcrypt.hash(password,10)
        const validateEmail = await knex('usuarios').select('*').where({email})
        

        if(validateEmail[0]?.email){
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        }

        const register = await knex('usuarios').insert({
            nome:name,
            email,
            senha:passwordEncrypted,
        }).returning('*')

        return res.status(201).json(register)
    } catch (error) {
        
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    registerUser,

}