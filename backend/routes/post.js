const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const router = express.Router();

const postCtrl = require("../controllers/post");

router.post('/', multer, postCtrl.addPost);
router.get('/', postCtrl.getAllPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;