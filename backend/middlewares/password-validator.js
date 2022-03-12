const passwordSchema = require("../models/Password");

// middleware permettant de vérifier si le mdp entré vérifie bien le schéma de validation
module.exports = (req, res, next) => {
  const valid = passwordSchema.validate(req.body.password);
  if (valid) {
    next();
  } else {
    const message =
      "Votre mot de passe doit comporter au minimum 8 caractères et au maximum 30 caractères, dont une majuscule, une minuscule et  chiffre. Il ne doit pas comporter de caractères spéciaux.";
    res.status(400).json({ message });
  }
};
