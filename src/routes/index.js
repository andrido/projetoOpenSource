const express = require('express');
const route = express()


const { registerUser, login, userDetails, editUser } = require('../controllers/controllersUser');
const { middlewareRegisterUser } = require('../middlewares/middlewareUser');
const { listCategories } = require('../controllers/controllerscategories');
const { orderRegister, listOrder } = require('../controllers/controllersOrders');



const schemaProduct = require('../schemas/schemaProducts');
const schemaUser = require('../schemas/schemaUser');
const schemaLogin = require('../schemas/schemaLogin');
const schemaClients = require('../schemas/schemaClients');
const schemaOrder = require('../schemas/schemaOrder');

const { validateToken } = require('../middlewares/validateToken');

const { productRegister, detailProduct, deleteProduct, editProduct, productListing } = require('../controllers/controllersProducts');
const { clientList, clientRegister, clientDetail, clientEdit } = require('../controllers/controllersClients');
const multer = require('../multer');


route.get('/categoria', listCategories);
route.post('/usuario', middlewareRegisterUser(schemaUser), registerUser);
route.post('/login', middlewareRegisterUser(schemaLogin), login);

route.use(validateToken)

route.put('/usuario', middlewareRegisterUser(schemaUser), editUser)
route.get('/usuario', userDetails)

route.post('/produto',multer.single('produto_imagem'), middlewareRegisterUser(schemaProduct), productRegister)
route.put('/produto/:id',multer.single('produto_imagem'),middlewareRegisterUser(schemaProduct), editProduct)
route.get('/produto', productListing)
route.get('/produto/:id', detailProduct)
route.delete('/produto/:id', deleteProduct)

route.get('/cliente', clientList)
route.get('/cliente/:id', clientDetail)
route.post('/cliente', middlewareRegisterUser(schemaClients), clientRegister)
route.put('/cliente/:id', middlewareRegisterUser(schemaClients), clientEdit)

route.post('/pedido', middlewareRegisterUser(schemaOrder), orderRegister)
route.get('/pedido', listOrder)
module.exports = route;