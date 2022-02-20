const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

const CommentModel = require("../models/Comment");
require('dotenv').config();

const dataBase = new Sequelize(
    `${process.env.DB_NAME}`,
    `${process.env.DB_USER}`,
    `${process.env.DB_PASSWORD}`, {
        host: `${process.env.DB_HOST}`,
        dialect: "mysql",
    }
)

dataBase
    .authenticate()
    .then(() => console.log("Connexion à la base de données réussie"))
    .catch((error) =>
        console.log("Impossible de se connecter à la base de données")
    );

const User = UserModel(dataBase, DataTypes);

const Comment = CommentModel(dataBase, DataTypes);

const initDb = () => {
    return dataBase.sync({ force: true }).then(() => {
        bcrypt.hash(`${process.env.ADMIN_PASSWORD}`, 10).then((hash) => {
            User.create({
                email: `${process.env.ADMIN_EMAIL}`,
                pseudo: `${process.env.ADMIN_PSEUDO}`,
                password: hash,
                isAdmin: false,
            }).then((user) => console.log(user.toJSON()));
        });
        console.log("la base de données est initialisée.");
    });
};

module.exports = { initDb, User, Comment };