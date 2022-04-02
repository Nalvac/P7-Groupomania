const express = require('express');
const multer = require("../middleware/multer");
const multerProfil = require("../middleware/multer-profil");
const routes = express.Router();
const userCtrl = require('../controllers/user');

routes.post('/signup', userCtrl.signUp);
routes.post('/login', userCtrl.login);
routes.put("/:id", multerProfil, userCtrl.updateUser);
routes.delete("/:id", userCtrl.deleteUser);

module.exports = routes;