module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Cet adresse mail est déja utilisé"
            },
            validate: {
                isEmail: { msg: "Veuillez entrer une adresse mail au bon format." }, // validation du schéma de l'entrée
                notNull: { msg: "Veuillez entrer une adresse mail." },
            }
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

            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Veuillez entrer un mot de passe." },
            },
        },
        imgProfil: {
            type: DataTypes.STRING,
        },
        poste: {
            type: DataTypes.STRING,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // true permet d'avoir des droits d'administrateur (suppression de tous les posts ou commentaires)
        },
    })
}
