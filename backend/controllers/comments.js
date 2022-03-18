const { Comment } = require("../database/dbConfig");

// Créer un commentaire sur un post
exports.addComment = (req, res, next) => {
    Comment.create(req.body)
        .then((comment) => {
            const message = "Votre commentaire a bien été ajouté.";
            return res.status(200).json({ message, data: comment });
        })
        .catch((error) => {
            const message =
                "L'ajout du commentaire a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};

// récupérer tous les commentaires
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

// Lire les commentaires sur un post
exports.getPostComments = (req, res, next) => {
    const id = req.params.id;
    Comment.findAll({
            where: {
                postId: id,
            },
            order: [
                ["createdAt", "DESC"]
            ], // affichage par comment le plus récent en premier
        })
        .then((comments) => {
            return res.status(200).json({ comments });
        })
        .catch((error) => {
            const message =
                "La récupération de tous les commentaires du post a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    const id = parseInt(req.params.id);
    Comment.findByPk(id)
        .then((comment) => {
            comment
                .destroy()
                .then(() => {
                    const message = "Le commentaire a bien été supprimé";
                    return res.status(200).json({ message });
                })
                .catch((error) => {
                    const message =
                        "La suppression du commentaire a échoué, veuillez réessayer dans quelques instants.";
                    return res.status(500).json({ message, data: error });
                });
        })
        .catch((error) => {
            const message =
                "La suppression du commentaire a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};

// Supprimer tous les commentaires d'un post (axe amélioration)
exports.deletePostComments = (req, res, next) => {
    const id = parseInt(req.params.id);
    Comment.destroy({ where: { postId: id } })
        .then(() => {
            const message = "les commentaires ont été supprimés.";
            return res.status(200).json({ message });
        })
        .catch((error) => {
            const message =
                "La suppression de tous les commentaires du post a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};

// Supprimer tous les commentaires d'un utilisateur (axe amélioration)
exports.deleteUserComments = (req, res, next) => {
    const id = parseInt(req.params.id);
    Comment.destroy({ where: { commenterId: id } })
        .then(() => {
            const message = "les commentaires ont été supprimés.";
            return res.status(200).json({ message });
        })
        .catch((error) => {
            const message =
                "La suppression des commentaires de l'utilisateur supprimé a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};