const express = require('express');

const routes = express.Router();
const userCtrl = require('../controllers/user');

routes.post('/signup', userCtrl.signUp);
routes.post('/login', userCtrl.login);

module.exports = routes;