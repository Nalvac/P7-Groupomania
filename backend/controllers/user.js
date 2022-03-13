const { User } = require('../database/dbConfig');
const bcrypt = require("bcrypt");

//Inscription
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        User.create({
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: hash
        }).then(() => {
            console.log('Utilisateur crée avec succès...');
        }).catch(error => {
            console.log("L'utilisateur n'a pas être crée !" + error)
        })
    })
}

exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            const message = "L'utilisateur n'existe pas !"
            return res.status(404).json({ message });
        }
        bcrypt.compare(req.body.password, user.password).then((valid) => {
            if (!valid) {
                const message = "Le mot de passe est incorrect";
                return res.status(401).json({ message });
            }

            const message = "L'utilisateur a été connecté avec succès";
            return res.status(200).json({ message });
        }).catch(error => {
            const message = 'L\'utilisateur n\'a pas pu être connecté, réessayez dans un instant.'
            return res.status(500).json({ message })
        })
    })
}