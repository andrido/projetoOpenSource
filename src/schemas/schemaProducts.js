const joi = require('joi');

const schemaProduct = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição não pode ser nulo',
        'string.base': 'O campo descrição precisa ser do tipo string'
    }),
    quantidade_estoque: joi.number().integer().required().positive().allow(0).messages({
        'any.required': 'O campo quantidade_estoque é obrigatório',
        'number.positive': 'O campo quantidade_estoque deverá ser um número não negativo',
        'number.base': 'O campo quantidade_estoque deverá ser um número'
    }),
    valor: joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.positive': 'O campo valor deverá ser um número positivo',
        'number.base': 'O campo valor deverá ser um número'

    }),
    categoria_id: joi.number().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatório',
        'number.base': 'O campo valor deverá ser um número',
    })
});

module.exports = schemaProduct