const { is } = require("express/lib/request");
const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8) // 8 caractères min
  .is()
  .max(30) // 30 caractères max
  .has()
  .uppercase() // une majuscule
  .has()
  .lowercase() // une minuscile
  .has()
  .digits() // 1 chiffre
  .has()
  .not()
  .spaces() // pas d'espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]) // termes interdits, faille de sécurité
  .has()
  .not()
  .symbols(); // pas de symbole pour la sécurité
module.exports = passwordSchema;
