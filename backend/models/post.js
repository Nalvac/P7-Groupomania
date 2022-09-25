module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Post", {

        post: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: "Veuillez entrer du contenu au post." },
                is: {
                    args: /^[^<>{}=+&$#\_\-\[\]§\/]+$/g,
                    msg: "Vos champs message ne doit pas contenir certains caractères spéciaux (<>{}[]=+$&#_) et ne doit pas être vide.", // contraintes de sécurité
                },
            },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        posterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imgUrl: {
            type: DataTypes.STRING,
        },
        postProfil: {
            type: DataTypes.STRING,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        usersLiked: {
            type: [DataTypes.DECIMAL],
        },
    })
}
