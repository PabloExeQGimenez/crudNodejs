const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    autor:{
        type: mongoose.Types.ObjectId,
        ref: 'Autor',
        required: true
    }
});

module.exports = mongoose.model('Libro', libroSchema);