const express = require('express');
const routesUser = express();
const { registerUser, login, userDetails, editUser} = require('../controllers/controllersUser');
const { middlewareRegisterUser } = require('../middlewares/middlewareUser');
const schemaUser = require('../schemas/schemaUser');
const schemaLogin = require('../schemas/schemaLogin');
const validateToken  = require('../middlewares/validateToken');


routesUser.post('/usuario', middlewareRegisterUser(schemaUser), registerUser);
routesUser.post('/login', middlewareRegisterUser(schemaLogin), login);


routesUser.use(validateToken)

routesUser.get('/usuario', userDetails)
routesUser.put('/usuario', editUser)

module.exports = routesUser;

