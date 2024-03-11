
const mongoose = require('mongoose');

const CommerceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cif: {
            type: String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefonoContacto: {
            type: String,
            required: true
        },
        idPagina: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        reviews: [{
            type: String
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('comercio', CommerceSchema);