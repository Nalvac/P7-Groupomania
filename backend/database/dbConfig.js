const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('../models/User')
const postModel = require('../models/post');
const CommentModel = require('../models/comments')
require('dotenv').config();

const bcrypt = require("bcrypt");
const dataBase = new Sequelize(
    `${process.env.DB_NAME}`, // nom de la bdd
    `${process.env.DB_USER}`, // nom utilisateur
    `${process.env.DB_PASSWORD}`, // mdp utilisateur
    {
        host: `${process.env.DB_HOST}`, // où se trouve la bdd
        dialect: "mysql", // dialecte pour sequelize pour interragir avec la bdd
        dialectOptions: {
            timezone: "Etc/GMT-2",
        },
        login: false,
    }
)

dataBase.authenticate().then(() => {
    console.log("Connexion Réussie");
}).catch(error => {
    console.log("Impossible de se connecter à la base de données" + error)
})

const User = userModel(dataBase, DataTypes);
const Post = postModel(dataBase, DataTypes);
const Comment = CommentModel(dataBase, DataTypes);
const initDb = () => {
    return dataBase.sync({ force: true }).then(() => {
        bcrypt.hash(`${process.env.ADMIN_PASSWORD}`, 10).then((hash) => {
            User.create({
                email: `${process.env.ADMIN_EMAIL}`,
                pseudo: `${process.env.ADMIN_PSEUDO}`,
                password: hash,
                imgProfil: "https://i.imgur.com/XyT4vI9.png",
                poste: "Admin",
                isAdmin: true,
            }).then((user) => console.log(user.toJSON()));
        });
        console.log("la base de données est initialisée.");
    });
};

module.exports = { initDb, User, Post, Comment };