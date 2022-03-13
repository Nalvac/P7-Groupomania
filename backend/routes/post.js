const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const router = express.Router();

const postCtrl = require("../controllers/post");

router.post('/', auth, multer, postCtrl.addPost);
router.get('/', auth, postCtrl.getAllPost);

module.exports = router;