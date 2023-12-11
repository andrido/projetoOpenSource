const joi = require('joi');

const schemaClients = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
        'string.base': 'O campo nome precisa ser do tipo string',
        'string.trim': 'O campo nome não pode ter espaço em branco'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'O campo email tem que estar num formato válido',
        'string.empty': 'O campo email é obrigatório',
        'string.base': 'O campo email precisa ser do tipo string',
        'string.trim': 'O campo email não pode ter espaço em branco'
    }),
    cpf: joi.string().min(11).required().messages({
        'string.min': 'O campo cpf tem que ter no mínimo 11 caracteres',
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf não pode ser nulo',
        'string.base': 'O campo cpf precisa ser do tipo string',
        'string.trim': 'O campo cpf não pode ter espaço em branco'
    }),
    cep: joi.string().min(8).messages({
      'string.min': 'O campo cep tem que ter no mínimo 8 caracteres',
      'string.base': 'O campo cep precisa ser do tipo string',
    }),
    rua: joi.string().messages({
      'string.base': 'O campo rua precisa ser do tipo string',
    }),
    numero: joi.string().min(1).messages({
      'string.base': 'O campo número precisa ser do tipo string',
      'string.min': 'O campo cep tem que ter no mínimo 1 caracteres'
    }),
    bairro: joi.string().messages({
      'string.base': 'O campo bairro precisa ser do tipo string',
    }),
    cidade: joi.string().messages({
      'string.base': 'O campo cidade precisa ser do tipo string',
    }),
    estado: joi.string().messages({
      'string.base': 'O campo estado precisa ser do tipo string',
    })
});

module.exports = schemaClients