const express = require('express');
const sequelize = require('./database/dbConfig')
const userRoute = require('./routes/user')
require('dotenv').config();
const app = express();

app.use(express.json());

// Gestion des CORS
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
})

// Corps des requêtes des req.body

app.use(express.json());

sequelize.initDb();

app.use('/api/user', userRoute)
module.exports = app;