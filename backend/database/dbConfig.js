const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('../models/User')
const postModel = require('../models/post');
const CommentModel = require('../models/comments')

const bcrypt = require("bcrypt");
const dataBase  = new Sequelize('testdb', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    }
  });


dataBase.authenticate().then(() => {
    console.log("Connexion Réussie");
}).catch(error => {
    console.log("Impossible de se connecter à la base de données" + error)
})
const User = userModel(dataBase, DataTypes);
const Post = postModel(dataBase, DataTypes);
const Comment = CommentModel(dataBase, DataTypes);
Comment.belongsTo(Post);
User.hasMany(Comment);
User.hasMany(Post);
const initDb = () => {
    return dataBase.sync({ force: true }).then(() => {
        bcrypt.hash(`root`, 10).then((hash) => {
            User.create({
                firstName: "Admin",
                lastName: "Admin",
                email: `root@gmail.com`,
                pseudo: `root`,
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
