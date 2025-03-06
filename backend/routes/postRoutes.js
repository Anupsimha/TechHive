const express = require("express");
const { getPosts, createPost, editPost, deletePost } = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost); 

module.exports = router;
