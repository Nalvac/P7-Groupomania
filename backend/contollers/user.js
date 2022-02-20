const { User } = require("../database/sequelize");
const bcrypt = require("bcrypt");

const { ValidationError, UniqueConstraintError } = require("sequelize");

exports.signUp = (req, res, next) => {

    bcrypt.hash(req.body.password, 10).then(hash => {
        User.create({
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: hash,
        }).then(user => {
            const message = `L'utilisateur ${req.body.pseudo} a bien été créé.`;
            res.status(201).json({ message, data: user });
        }).catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error }); // remontée des erreurs avec sequelize
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error }); // remontée des erreurs avec Unicité de l'email
            }
        })
    })


}