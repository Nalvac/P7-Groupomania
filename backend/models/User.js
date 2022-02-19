// création du modèle d'utilisateur
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Cet adresse mail est déjà utilisée.", // Gère l'unicité de l'adresse mail dans la bdd
            },
            validate: {
                isEmail: { msg: "Veuillez entrer une adresse mail au bon format." }, // validation du schéma de l'entrée
                notNull: { msg: "Veuillez entrer une adresse mail." },
                is: {
                    args: /^[^<>{}()=+,:&$#"'\(\)\_\-\[\]!?§\/]+$/g,
                    msg: "Votre champs adresse email ne doit pas contenir de caractères spéciaux .", // Sécurité des champs de formulaire
                },
            },
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Ce pseudo est déjà utilisé.", // Gère l'unicité du pseudo dans la bdd
            },
            validate: {
                len: {
                    args: [4, 16],
                    msg: "Votre pseudo doit comporter entre 4 et 16 caractères.",
                },
                notNull: {
                    msg: "Avoir un pseudo est obligatoire, veuillez entrer un pseudo.",
                },
                is: {
                    args: /^[^<>{}()=+,.:&$#"'\(\)\_\-\[\]!?§\/]+$/g,
                    msg: "Votre champs pseudo ne doit pas contenir de caractères spéciaux .", // contraintes sur le pseudo
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Veuillez entrer un mot de passe." },
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // true permet d'avoir des droits d'administrateur (suppression de tous les posts ou commentaires)
        },
    });
};