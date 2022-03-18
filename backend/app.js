const express = require('express');
const sequelize = require('./database/dbConfig')
const userRoute = require('./routes/user')
const postsRoutes = require("./routes/post");
const commentsRoutes = require("./routes/comment")
require('dotenv').config();
const path = require("path")
const app = express();

app.use(express.json());

// Gestion des CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Corps des requêtes des req.body

app.use(express.json());

sequelize.initDb();

//traitement des fichiers
app.use("/images", express.static(path.join(__dirname, "images")));

app.use('/api/user', userRoute)

app.use('/api/post', postsRoutes)


app.use("/api/comment", commentsRoutes);

module.exports = app;