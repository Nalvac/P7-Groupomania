const express = require("express");
const commentCtrl = require("../contollers/comment")
const router = express.Router();


router.get("/", commentCtrl.getAllComments);

module.exports = router;