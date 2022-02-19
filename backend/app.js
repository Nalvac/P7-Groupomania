const express = require("express");
const http = require("http")
const userRoute = require("./routes/user");
const sequelize = require("./database/sequelize")
const db = require("./database/sequelize");
const app = express();

app.use(express.json());

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
// connexion avec la bdd
sequelize.initDb();

app.use("/api/user", userRoute);
module.exports = app;