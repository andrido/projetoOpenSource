const express = require('express');
const route = express()

const { registerUser, login, userDetails, editUser } = require('../controllers/controllersUser');
const { middlewareRegisterUser } = require('../middlewares/middlewareUser');
const { listCategories } = require('../controllers/controllerscategories');



const schemaProduct = require('../schemas/schemaProducts');
const schemaUser = require('../schemas/schemaUser');
const schemaLogin = require('../schemas/schemaLogin');

const { validateToken } = require('../middlewares/validateToken');
const { productRegister, detailProduct, deleteProduct } = require('../controllers/controllersProducts');


route.get('/categoria', listCategories);
route.post('/usuario', middlewareRegisterUser(schemaUser), registerUser);
route.post('/login', middlewareRegisterUser(schemaLogin), login);

route.use(validateToken)

route.put('/usuario', middlewareRegisterUser(schemaUser), editUser)
route.get('/usuario', userDetails)

route.post('/produto', middlewareRegisterUser(schemaProduct), productRegister)
route.get('/produto/:id', detailProduct)
route.delete('/produto/:id', deleteProduct)

module.exports = route;