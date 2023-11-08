const mongoose = require('mongoose');

const Natural = mongoose.model( 'Natural', {
    userId: {type: String, require:true},
    nombre: {type: String, require:true},
    valid: {type: Boolean, require: true, default: false},
    apellido: {type: String, require: true},
    valid: {type: Boolean, require: true, default: false},
    direccion: {type: String, require:true},
    valid: {type: Boolean, require: true, default: false},
    provincia: {type: String, require:true},
    valid: {type: Boolean, require: true, default: false},
    ciudad: {type: String, require: true},
    valid: {type: Boolean, require: true, default: false},
    celular: {type: Number, require: true},
    valid: {type: Boolean, require: true, default: false},
    telefono: {type: Number, require: true},
    valid: {type: Boolean, require: true, default: false},
    perfilProfesiona: {type: String, require: true},
    valid: {type: Boolean, require: true, default: false},
    urlUbicacion: {type: String, require: true},
    valid: {type: Boolean, require: true, default: false},
    commentValidation: {type: String, require: true, default: 'sin validar'},
    createdAt: {type: Date, require:true, default: new Date()}
});

module.exports = Natural;