require("dotenv").config();
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.static("public")); // Serving static files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
