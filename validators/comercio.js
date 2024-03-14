/**
 * Conjunto de validaciones utilizando express-validator 
 * para verificar los campos de entrada al crear un comercio.
 */

const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Validador para la creación de un comercio.
const validateCreate = [
    check("name").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("telefonoContacto").exists().notEmpty(),
    check("idPagina").exists().notEmpty().isNumeric(),
    check("description").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validateCreate };
