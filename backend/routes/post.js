const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const router = express.Router();

const postCtrl = require("../controllers/post");

router.post('/', multer, postCtrl.addPost);
router.get('/', postCtrl.getAllPost);

router.put("/:id", auth, multer, postCtrl.updatePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;