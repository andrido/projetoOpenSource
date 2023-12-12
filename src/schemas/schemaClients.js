const joi = require('joi');

const schemaClients = joi.object({
    nome: joi.string().regex(/^\w+$/).required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
        'string.base': 'O campo nome precisa ser do tipo string',
        'string.pattern.base': 'O campo nome não pode ter espaço em branco'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email tem que estar num formato válido',
        'string.base': 'O campo email precisa ser do tipo string',
    }),
    cpf: joi.string().regex(/^[0-9]+$/).min(11).max(11).required().messages({
        'string.min': 'O campo cpf tem que ter 11 caracteres',
        'string.max': 'O campo cpf tem que ter 11 caracteres',
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf é obrigatório',
        'string.base': 'O campo cpf precisa ser do tipo string',
        'string.pattern.base': 'O campo cpf só pode conter números inteiros'
    }),
    cep: joi.string().regex(/^[0-9]+$/).min(8).max(8).messages({
      'string.min': 'O campo cep tem que ter 8 caracteres',
      'string.max': 'O campo cep tem que ter 8 caracteres',
      'string.base': 'O campo cep precisa ser do tipo string',
      'string.pattern.base': 'O campo cep só pode conter números inteiros'  
    }),
    rua: joi.string().min(1).messages({
      'string.min': 'O campo rua tem que ter no mínimo 1 caractere',
      'string.base': 'O campo rua precisa ser do tipo string',
      'string.empty': 'O campo rua não pode está vazio',
    }),
    numero: joi.string().min(1).messages({
      'string.base': 'O campo número precisa ser do tipo string',
      'string.min': 'O campo número tem que ter no mínimo 1 caractere',
      'string.empty': 'O campo número não pode está vazio',
    }),
    bairro: joi.string().min(1).messages({
      'string.min': 'O campo bairro tem que ter no mínimo 1 caractere',
      'string.base': 'O campo bairro precisa ser do tipo string',
      'string.empty': 'O campo bairro não pode está vazio',
    }),
    cidade: joi.string().min(1).messages({
      'string.min': 'O campo cidade tem que ter no mínimo 1 caractere',
      'string.base': 'O campo cidade precisa ser do tipo string',
      'string.empty': 'O campo cidade não pode está vazio',
    }),
    estado: joi.string().min(1).messages({
      'string.min': 'O campo estado tem que ter no mínimo 1 caractere',
      'string.base': 'O campo estado precisa ser do tipo string',
      'string.empty': 'O campo estado não pode está vazio',
    })
});

module.exports = schemaClients