const express = require('express');
const routesUser = express();
const { registerUser, login, } = require('../controllers/controllersUser');
const { middlewareRegisterUser } = require('../middlewares/middlewareUser');
const schemaUser = require('../schemas/schemaUser');


routesUser.post('/user', middlewareRegisterUser(schemaUser), registerUser);
routesUser.post('/login', login);

module.exports = routesUser;

