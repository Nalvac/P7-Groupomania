const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/post");
const commentsRoutes = require("./routes/comment.js");
const path = require("path");
const app = express();
const sequelize = require("./database/sequelize");
require("dotenv").config();

app.use(helmet());

//gestion du cors

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//récupération des requêtes dans req.body
app.use(bodyParser.json());
//traitement des fichiers
app.use("/images", express.static(path.join(__dirname, "images")));

// connexion avec la bdd
sequelize.initDb();

app.use("/api/user", userRoutes);
app.use("/api/post", postsRoutes);
app.use("/api/comment", commentsRoutes);

module.exports = app;
