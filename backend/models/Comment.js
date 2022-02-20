module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Comment", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Veuillez entrer un commentaire." },
                is: {
                    args: /^[^<>{}=+&$#\_\-\[\]§\/]+$/g,
                    msg: "Vos champs commentaire ne doit pas contenir certains caractères spéciaux (<>{}[]=+$&#_) et ne doit pas être vide.", // contraintes de sécurité
                },
            },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commenterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};