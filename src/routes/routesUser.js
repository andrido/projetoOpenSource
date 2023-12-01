const express = require('express');
const routesUser = express();
const { registerUser } = require('../controllers/controllersUser');
const { middlewareRegisterUser } = require('../middlewares/middlewareUser');
const schemaUser = require('../schemas/schemaUser');


routesUser.post('/user', middlewareRegisterUser(schemaUser),registerUser);

module.exports = routesUser;

