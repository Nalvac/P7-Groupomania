const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const commentCtrl = require('../controllers/comments')

router.post("/", commentCtrl.addComment);
router.delete("/:id", commentCtrl.deleteComment);
router.delete("/post/:id", auth, commentCtrl.deletePostComments);
router.get("/:id", auth, commentCtrl.getPostComments);
router.get("/", auth, commentCtrl.getAllComments);

module.exports = router;