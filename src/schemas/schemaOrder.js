
const Joi = require('joi');

const schemaOrder = Joi.object({
    cliente_id: Joi.number().integer().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório',
        'number.base': 'O campo cliente_id deverá ser um número inteiro',
        'number.positive': 'O campo cliente_id deverá ser um número positivo',
        'number.integer': 'O campo cliente_id deverá ser um número inteiro',
    }),

    observacao: Joi.string().allow('').trim().messages({
        'string.base': 'O campo observacao deverá ser uma string',
    }),

    pedido_produtos: Joi.array().items(
        Joi.object({
            produto_id: Joi.number().integer().positive().required().messages({
                'any.required': 'O campo produto_id é obrigatório',
                'number.base': 'O campo produto_id deverá ser um número inteiro',
                'number.positive': 'O campo produto_id deverá ser um número positivo',
                'number.integer': 'O campo produto_id deverá ser um número inteiro',
            }),

            quantidade_produto: Joi.number().integer().positive().required().messages({
                'any.required': 'O campo quantidade_produto é obrigatório',
                'number.base': 'O campo quantidade_produto deverá ser um número inteiro',
                'number.positive': 'O campo quantidade_produto deverá ser um número positivo',
                'number.integer': 'O campo quantidade_produto deverá ser um número inteiro',
            }),

            valor_produto: Joi.number().precision(2).positive().required().messages({
                'any.required': 'O campo valor_produto é obrigatório',
                'number.base': 'O campo valor_produto deverá ser um número',
                'number.positive': 'O campo valor_produto deverá ser um número positivo',
            }),
        })
    ).min(1).required().messages({
        'array.base': 'O campo pedido_produtos deve ser um array não vazio',
        'array.min': 'O campo pedido_produtos deve conter pelo menos um produto',
    }),
});

module.exports = schemaOrder;
