const route = require('express').Router();
const routesUser = require('./routesUser');
const routesCategories = require('./routesCategories');

route.use(routesUser, routesCategories);


module.exports = route;