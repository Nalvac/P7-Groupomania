const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const CommentModel = require("../models/Comment");
require("dotenv").config();

// création d'une instance sequelize (paramètres de connexions)
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
);

// test de la connexion
dataBase
    .authenticate()
    .then(() => console.log("Connexion à la base de données réussie"))
    .catch((error) =>
        console.log("Impossible de se connecter à la base de données")
    );

const Post = PostModel(dataBase, DataTypes);
const User = UserModel(dataBase, DataTypes);
const Comment = CommentModel(dataBase, DataTypes);

// initialiser la bdd avec la création d'un administrateur
const initDb = () => {
    return dataBase.sync({ force: true }).then(() => {
        bcrypt.hash(`${process.env.ADMIN_PASSWORD}`, 10).then((hash) => {
            User.create({
                email: `${process.env.ADMIN_EMAIL}`,
                pseudo: `${process.env.ADMIN_PSEUDO}`,
                password: hash,
                isAdmin: true,
            }).then((user) => console.log(user.toJSON()));
        });
        console.log("la base de données est initialisée.");
    });
};

module.exports = { initDb, User, Post, Comment };