const joi = require('joi');

const schemaUser = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty':'O campo nome é obrigatório'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'O campo email tem que estar num formato válido',
        'string.empty':'O campo email é obrigatório'
    }),
    password: joi.string().min(5).required().messages({
        'string.min': 'O campo senha tem que ter no mínimo 5 caracteres',
        'any.required': 'O campo senha é obrigatório',
        'string.empty':'O campo senha é obrigatório'
    })
});

module.exports = schemaUser