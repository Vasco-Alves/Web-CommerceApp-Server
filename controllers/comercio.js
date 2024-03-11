
const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');

const Comercio = require('../models/nosql/comercio');

/** Obtiene todos los comercios en la bd */
const getItems = async (req, res) => {
    try {
        const data = await Comercio.find();
        res.send(data);

    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}

/** Obtiene un solo comercio con CIF específico */
const getItemByCIF = async (req, res) => {
    try {
        const cif = req.params.cif;
        const data = await Comercio.findOne({ cif });

        if (!data) return handleHttpError(res, 'ERROR_COMERCIO_NOT_FOUND');

        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEM_CIF');
    }
}

/** Crea un nuevo comercio en la bd */
const createItem = async (req, res) => {
    try {
        const { body } = req;
        const data = await Comercio.create(body);
        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}

const updateItem = async (req, res) => {
    try {
        const cif = req.params.cif;
        const body = req.body;
        const data = await Comercio.findOneAndUpdate({ cif: cif }, body, { new: true });

        if (!data) return handleHttpError(res, 'ERROR_COMERCIO_NOT_FOUND');

        res.send(data);
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }
}


const deleteItem = async (req, res) => {
    try {
        const cif = req.params.cif;
        const tipo = req.query.tipo;

        const allowedTipos = ['logico', 'fisico'];
        if (!allowedTipos.includes(tipo))
            return handleHttpError(res, 'ERROR_INVALID_TIPO');

        let data;

        // TODO

        // Soft delete by updating a flag
        if (tipo === 'logico')
            data = await Comercio.findOneAndUpdate({ cif: cif }, { deleted: true }, { new: true });

        // Hard delete
        else
            data = await Comercio.findOneAndDelete({ cif: cif });

        // const data = await (req.query.tipo === 'logico' ? Comercio.delete({ cif: req.params.cif }) : Comercio.deleteOne({ cif: req.params.cif }));

        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_DELTE_ITEMS');
    }
}

module.exports = { getItems, getItemByCIF, createItem, updateItem, deleteItem };