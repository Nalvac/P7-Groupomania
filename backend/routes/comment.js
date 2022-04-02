const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const commentCtrl = require('../controllers/comments')

router.post("/", commentCtrl.addComment);
router.delete("/:id", commentCtrl.deleteComment);
router.get("/:id", commentCtrl.getPostComments);
router.get("/", commentCtrl.getAllComments);

module.exports = router;