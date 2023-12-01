const route = require('express').Router();
const routesUser = require('./routesUser');

route.use(routesUser);

module.exports = route;