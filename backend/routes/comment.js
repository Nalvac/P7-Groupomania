const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

const commentCtrl = require("../contollers/comment");

// routes des commentaires acec middleware d'authentification
router.post("/", auth, commentCtrl.addComment);
router.get("/", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getPostComments);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.delete("/post/:id", auth, commentCtrl.deleteUserComments);
router.delete("/user/:id", auth, commentCtrl.deleteUserComments);

module.exports = router;
