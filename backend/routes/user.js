const express = require("express");
const router = express.Router();
const checkpassword = require("../middlewares/password-validator.js");

const userCtrl = require("../contollers/user.js");

//inscription
router.post("/signup", checkpassword, userCtrl.signup);
router.post("/login", userCtrl.login);

//récupérer tous les users
router.get("/", userCtrl.getAllUsers); // axe amélioration
router.get("/:id", userCtrl.getOneUser); // axe amélioration
router.put("/:id", userCtrl.updateUser); // axe amélioration
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
