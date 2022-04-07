const { User } = require('../database/dbConfig');
const { Post } = require("../database/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
    //Inscription
exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        User.create({
            email: req.body.email,
            pseudo: req.body.pseudo,
            password: hash,
            imgProfil: "https://i.imgur.com/XyT4vI9.png",
            poste: "Employé chez Groupomania"
        }).then((user) => {
            const message = `L'utilisateur ${req.body.pseudo} a bien été créé.`;
            res.status(201).json({ message, data: user });
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
            const token = jwt.sign(
                // création d'un token d'authentification
                { userId: user.id },
                `${process.env.PRIVATE_KEY}`, {
                    expiresIn: "24h",
                }
            );
            const message = "L'utilisateur a été connecté avec succès";
            return res.status(200).json({ message, data: user, token });
        }).catch(error => {
            const message = 'L\'utilisateur n\'a pas pu être connecté, réessayez dans un instant.'
            return res.status(500).json({ message })
        })
    })
}
exports.updateUser = (req, res, next) => {
    User.findOne({
            where: {
                id: req.params.id,
            },
        })
        .then((user) => {
            if (!user) {
                const message =
                    "L'utilisateur demandé n'existe pas, veuillez réessayer avec un autre identifiant.";
                return res.status(404).json({ message });
            }
            const email = req.body.email;
            const pseudo = req.body.pseudo;
            const poste = req.body.poste;
            console.log(req.file)
            if (req.file) {

                console.log(req.file)
                const file = `${req.file.filename}`;
                user.update({
                        email: email,
                        pseudo: pseudo,
                        poste: poste,
                        imgProfil: `${req.protocol}://${req.get("host")}/images/${file}`,
                    })
                    .then((user) => {
                        const message = "Votre profil a été modifié.";
                        return res.status(201).json({ message, data: user });
                    })
                    .catch((error) => {

                        const message =
                            "L'update a échoué, veuillez réessayer dans quelques instants.";
                        return res.status(500).json({ message, data: error });
                    });
            } else {
                debugger;
                user.update({
                        email: email,
                        pseudo: pseudo,
                        poste: poste,
                    })
                    .then((post) => {
                        const message = "Votre profil a été modifié.";
                        return res.status(201).json({ message, data: user });
                    })
                    .catch((error) => {
                        if (error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error });
                        }
                        const message =
                            "L'update du profil a échoué, veuillez réessayer dans quelques instants.";
                        return res.status(500).json({ message, data: error });
                    });
            }

        })
        .catch((error) => {
            const message =
                "La modification d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};

//Delete user, suppression d'un utilisateur et de tous ces posts

exports.deleteUser = (req, res, next) => {
    User.findOne({
            where: {
                id: req.params.id,
            },
        })
        .then((user) => {
            if (!user) {
                const message =
                    "L'utilisateur demandé n'existe pas, veuillez réessayer avec un autre identifiant.";
                return res.status(404).json({ message });
            }
            return user.destroy().then(() => {
                return Post.destroy({ where: { posterId: req.params.id } }).then(() => {
                    const message = "L'utilisateur et ses posts ont été supprimés";
                    return res.status(200).json({ message });
                });
            });
        })
        .catch((error) => {
            const message =
                "La suppression d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};