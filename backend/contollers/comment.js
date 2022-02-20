const { Comment } = require("../database/sequelize");
exports.getAllComments = (req, res, next) => {
    Comment.findAll()
        .then((comments) => {
            const message = "Voici tous les commentaires.";
            return res.status(200).json({ message, data: comments });
        })
        .catch((error) => {
            const message =
                "La récupération de tous les commentaires a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};