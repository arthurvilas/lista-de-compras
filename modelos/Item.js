const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome do item deve ser fornecido'],
        maxlength: 30,
        trim: true
    },
    marca: {
        type: String,
        default: 'Qualquer',
        maxlength: 30,
        trim: true
    },
    quantidade: {
        type: Number,
        default: 1,
        min: 1
    },
    comprado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Item', ItemSchema);