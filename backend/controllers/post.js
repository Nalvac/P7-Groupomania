const { Post } = require('../database/dbConfig')
const fs = require("fs");

exports.getAllPost = (req, res, next) => {
    Post.findAll({
        order: [
            ["createdAt", "DESC"]
        ]
    }).then(post => {
        const message = "Voici les posts";
        return res.status(200).json({ message, data: post })
    })
}
exports.addPost = (req, res, next) => {
    const message = req.body.post;
    const author = req.body.author;
    const posterId = req.body.posterId;
    const postProfil = req.body.postProfil;
    console.log(req.file)
    if (req.file) {

        console.log(req.file)
        const file = `${req.file.filename}`;
        Post.create({
                // création d'un post avec un fichier image
                author: author,
                post: message,
                posterId: posterId,
                imgUrl: `${req.protocol}://${req.get("host")}/images/${file}`,
                postProfil: postProfil,
            })
            .then((post) => {
                const message = "Votre mesage a été créé.";
                return res.status(201).json({ message, data: post });
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message =
                    "L'ajout du post a échoué, veuillez réessayer dans quelques instants.";
                return res.status(500).json({ message, data: error });
            });
    } else {
        debugger;
        Post.create({
                // création d'un post sans fichier image
                author: author,
                post: message,
                posterId: posterId,
                postProfil: postProfil,
            })
            .then((post) => {
                const message = "Votre mesage a été créé.";
                return res.status(201).json({ message, data: post });
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message =
                    "L'ajout du post a échoué, veuillez réessayer dans quelques instants.";
                return res.status(500).json({ message, data: error });
            });
    }
};
exports.deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    Post.findByPk(id)
        .then((post) => {
            console.log(post);
            if (post.imgUrl) {
                const filename = post.imgUrl.split("/images")[1]; // suppression de l'image
                fs.unlink(`images/${filename}`, () => {
                    post
                        .destroy()
                        .then(() => {
                            const message = "Le post a bien été supprimé.";
                            return res.status(200).json({ message });
                        })
                        .catch((error) => {
                            const message =
                                "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
                            return res.status(500).json({ message, data: error });
                        });
                });
            } else {
                post
                    .destroy()
                    .then(() => {
                        const message = "Le post a bien été supprimé.";
                        return res.status(200).json({ message });
                    })
                    .catch((error) => {
                        const message =
                            "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
                        return res.status(500).json({ message, data: error });
                    });
            }
        })
        .catch((error) => {
            const message =
                "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};
exports.getOnePost = (req, res, next) => {
    Post.findByPk(req.params.id)
        .then((post) => {
            if (post === null) {
                const message =
                    "le post demandé n'existe pas. Réessayer avec un autre identifiant de post.";
                return res.status(404).json({ message });
            }
            const message = "Voici le post choisi.";
            return res.status(200).json({ message, data: post });
        })
        .catch((error) => {
            const message =
                "La récupération du post a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};
exports.updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = req.body.post;
    const imgUrl = req.body.imgUrl;
    Post.findByPk(id)
        .then((post) => {
            if (post === null) {
                const message =
                    "le post demandé n'existe pas, veuilez réessayer avec un autre identifiant.";
                return res.status(404).json({ message });
            }
            if (post.imgUrl) {
                // suppression de l'ancienne image si l'on change l'image
                const filename = post.imgUrl.split("/images")[1];
                fs.unlink(`images/${filename}`, () => {});
            }
        })
        .catch((error) => {
            const message =
                "La modification du post a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
    if (req.file) {
        // s'il y a un fichier image
        const file = `${req.file.filename}`;
        Post.update({
                post: post,
                imgUrl: `${req.protocol}://${req.get("host")}/images/${file}`,
            }, {
                where: {
                    id: id,
                },
            })
            .then(() => {
                Post.findByPk(id)
                    .then((post) => {
                        const message = `Le post a bien été modifié.`;
                        return res.status(200).json({ message, data: post });
                    })
                    .catch((error) => {
                        const message =
                            "La modification du post a échoué, veuillez réessayer dans quelques instants.";
                        return res.status(500).json({ message, data: error });
                    });
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message =
                    "La modification du post a échoué, veuillez réessayer dans quelques instants.";
                return res.status(500).json({ message, data: error });
            });
    } else {
        Post.update(
                // s'il n'y a pas de fichier image
                {
                    post: post,
                    imgUrl: imgUrl,
                }, {
                    where: {
                        id: id,
                    },
                }
            )
            .then(() => {
                Post.findByPk(id).then((post) => {
                    const message = `Le post a bien été modifié.`;
                    return res.status(200).json({ message, data: post });
                });
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message =
                    "La modification du post a échoué, veuillez réessayer dans quelques instants.";
                return res.status(500).json({ message, data: error });
            });
    }
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    Post.findByPk(id)
        .then((post) => {
            if (post.imgUrl) {
                const filename = post.imgUrl.split("/images")[1]; // suppression de l'image
                fs.unlink(`images/${filename}`, () => {
                    post
                        .destroy()
                        .then(() => {
                            const message = "Le post a bien été supprimé.";
                            return res.status(200).json({ message });
                        })
                        .catch((error) => {
                            const message =
                                "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
                            return res.status(500).json({ message, data: error });
                        });
                });
            } else {
                post
                    .destroy()
                    .then(() => {
                        const message = "Le post a bien été supprimé.";
                        return res.status(200).json({ message });
                    })
                    .catch((error) => {
                        const message =
                            "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
                        return res.status(500).json({ message, data: error });
                    });
            }
        })
        .catch((error) => {
            const message =
                "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
            return res.status(500).json({ message, data: error });
        });
};