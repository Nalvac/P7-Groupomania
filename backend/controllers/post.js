const { Post } = require('../database/dbConfig')

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
    console.log(req.file)
    if (req.file) {
        const file = `${req.file.filename}`;
        Post.create({
                // création d'un post avec un fichier image
                author: author,
                post: message,
                posterId: posterId,
                imgUrl: `${req.protocol}://${req.get("host")}/images/${file}`,
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
        Post.create({
                // création d'un post sans fichier image
                post: message,
                posterId: posterId,
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