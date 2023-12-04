const express = require('express');
const routerCategories = express();
const { listCategories } = require('../controllers/controllerscategories');


routerCategories.get('/categories', listCategories);

module.exports = routerCategories;

