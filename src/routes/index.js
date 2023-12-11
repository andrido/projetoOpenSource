const express = require('express');
const route = express()

const { registerUser, login, userDetails, editUser } = require('../controllers/controllersUser');
const { middlewareRegisterUser } = require('../middlewares/middlewareUser');
const { listCategories } = require('../controllers/controllerscategories');



const schemaProduct = require('../schemas/schemaProducts');
const schemaUser = require('../schemas/schemaUser');
const schemaLogin = require('../schemas/schemaLogin');
const schemaClients = require('../schemas/schemaClients');

const { validateToken } = require('../middlewares/validateToken');

const { productRegister, detailProduct, deleteProduct, editProduct, productListing } = require('../controllers/controllersProducts');
const { clientList, clientRegister } = require('../controllers/controllersClients');


route.get('/categoria', listCategories);
route.post('/usuario', middlewareRegisterUser(schemaUser), registerUser);
route.post('/login', middlewareRegisterUser(schemaLogin), login);

route.use(validateToken)

route.put('/usuario', middlewareRegisterUser(schemaUser), editUser)
route.get('/usuario', userDetails)

route.post('/produto', middlewareRegisterUser(schemaProduct), productRegister)
route.get('/produto/:id', detailProduct)
route.get('/produto', productListing)
route.delete('/produto/:id', deleteProduct)
route.put('/produto/:id', middlewareRegisterUser(schemaProduct), editProduct)

route.get('/cliente', clientList)
route.post('/cliente', middlewareRegisterUser(schemaClients), clientRegister)

module.exports = route;