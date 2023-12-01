const joi = require('joi');

const schemaUser = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});

module.exports = schemaUser