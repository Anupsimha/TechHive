const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readData, writeData } = require("../utils/fileUtils");

exports.register = (req, res, next) => {
    try {
        let { users, posts } = readData();
        const { username, email, password } = req.body;

        if (users.find((user) => user.email === email)) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = { id: Date.now(), username, email, password: hashedPassword };

        users.push(newUser);
        writeData({ users, posts });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        next(error);
    }
};

exports.login = (req, res, next) => {
    try {
        let { users } = readData();
        const { email, password } = req.body;

        const user = users.find((u) => u.email === email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = (req, res, next) => {
    try {
        let { users, posts } = readData();
        const { username, email, password } = req.body;
        const userIndex = users.findIndex((u) => u.id === req.user.id);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username) users[userIndex].username = username;
        if (email) users[userIndex].email = email;
        if (password) users[userIndex].password = bcrypt.hashSync(password, 10);

        writeData({ users, posts });

        res.json({ message: "Profile updated successfully", user: users[userIndex] });
    } catch (error) {
        next(error);
    }
};