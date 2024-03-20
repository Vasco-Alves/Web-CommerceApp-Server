/**
 * Controladores para realizar operaciones en 
 * la base de datos para el Comercio.
 */

const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

// Importamos el modelo de comercio.
const Comercio = require('../models/comercio');

/** Obtiene todos los comercios en la base de datos */
const getItems = async (req, res) => {
    try {
        let orderedBy;
        if (req.query.order !== undefined)
            orderedBy = req.query.order;

        const data = await Comercio.find();

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}


/** Obtiene un solo comercio con un CIF específico */
const getItemByCIF = async (req, res) => {
    try {
        const cif = req.params.cif;
        const data = await Comercio.findOne({ cif });

        // Si no encuentra el comercio devuelve error.
        if (!data)
            return handleHttpError(res, 'ERROR_COMERCIO_NOT_FOUND');

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM_CIF');
    }
}

/** Crea un nuevo comercio en la base de datos */
const createItem = async (req, res) => {
    try {
        const { body } = req; // Extrae los datos validados del cuerpo de la solicitud
        const data = await Comercio.create(body); // Crear un nuevo comercio con los datos proporcionados
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}

/** Actualiza un comercio existente en la base de datos */
const updateItem = async (req, res) => {
    try {
        const { body } = req; // Obtiene los datos actualizados del cuerpo de la solicitud
        const cif = req.params.cif; // Obtiene el CIF del comercio desde los parámetros de la solicitud
        const data = await Comercio.findOneAndUpdate({ cif: cif }, body, { new: true }); // Busca y actualiza el comercio con el CIF proporcionado

        // Si no encuentra el comercio devuelve error.
        if (!data)
            return handleHttpError(res, 'ERROR_COMERCIO_NOT_FOUND');

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }
}

/** Elimina un comercio de la base de datos */
const deleteItem = async (req, res) => {
    try {
        const cif = req.params.cif; // Obtiene el cif desde la solicitud
        const tipo = req.query.tipo; // Obtiene el tipo de eliminación

        // Tipos de eliminación permitidos
        const allowedTipos = ['logico', 'fisico'];
        // Validar que el tipo de eliminación especificado sea válido
        if (!allowedTipos.includes(tipo))
            return handleHttpError(res, 'ERROR_INVALID_TIPO');

        let data;

        // Realizar la eliminación lógica o física según el tipo especificado
        if (tipo === 'logico')
            data = await Comercio.findOneAndUpdate({ cif: cif }, { deleted: true }, { new: true });
        else
            data = await Comercio.findOneAndDelete({ cif: cif });

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_DELTE_ITEMS');
    }
}

// Exporta los controladores para ser utilizados en otras partes de la aplicación
module.exports = { getItems, getItemByCIF, createItem, updateItem, deleteItem };
