const express = require("express");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const router = express.Router();

const postCtrl = require("../contollers/post");

// routes des posts avec middleware d'authentification et de traitement des fichiers images
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.addPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.delete("/user/:id", auth, postCtrl.deleteUserPosts);

module.exports = router;
