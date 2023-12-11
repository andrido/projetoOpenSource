const joi = require('joi');

const schemaUser = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
        'string.base': 'O campo nome precisa ser do tipo string'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'O campo email tem que estar num formato válido',
        'string.empty': 'O campo email é obrigatório',
        'string.base': 'O campo email precisa ser do tipo string'
    }),
    senha: joi.string().min(5).required().messages({
        'string.min': 'O campo senha tem que ter no mínimo 5 caracteres',
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha não pode ser nulo',
        'string.base': 'O campo senha precisa ser do tipo string'
    })
});

module.exports = schemaUser