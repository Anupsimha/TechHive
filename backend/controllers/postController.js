const { readData, writeData } = require("../utils/fileUtils");

exports.getPosts = (req, res, next) => {
    try {
        const { posts } = readData();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

exports.createPost = (req, res, next) => {
    try {
        let { users, posts } = readData();
        const newPost = {
            id: Date.now(),
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id,
        };

        posts.push(newPost);
        writeData({ users, posts });

        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

exports.editPost = (req, res, next) => {
    try {
        let { users, posts } = readData();
        const { id } = req.params;
        const { title, content } = req.body;

        const postIndex = posts.findIndex((p) => p.id == id && p.userId === req.user.id);
        if (postIndex === -1) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }

        if (title) posts[postIndex].title = title;
        if (content) posts[postIndex].content = content;

        writeData({ users, posts });

        res.json({ message: "Post updated successfully", post: posts[postIndex] });
    } catch (error) {
        next(error);
    }
};

exports.deletePost = (req, res, next) => {
    try {
        let { users, posts } = readData();
        const { id } = req.params;

        const postIndex = posts.findIndex((p) => p.id == id && p.userId === req.user.id);
        if (postIndex === -1) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }

        posts.splice(postIndex, 1);
        writeData({ users, posts });

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        next(error);
    }
};