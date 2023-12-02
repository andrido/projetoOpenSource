const express = require('express');
const routesUser = express();
const { registerUser, login, } = require('../controllers/controllersUser');
const { middlewareRegisterUser } = require('../middlewares/middlewareUser');
const schemaUser = require('../schemas/schemaUser');
const schemaLogin = require('../schemas/schemaLogin');


routesUser.post('/user', middlewareRegisterUser(schemaUser), registerUser);
routesUser.post('/login', middlewareRegisterUser(schemaLogin), login);

module.exports = routesUser;

