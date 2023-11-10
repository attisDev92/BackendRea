const mongoose = require('mongoose');

const Natural = mongoose.model( 'Natural', {
    userId: {type: String, require:true},
    nombre: {type: String, require:true},
    apellido: {type: String, require: true},
    direccion: {type: String, require:true},
    provincia: {type: String, require:true},
    ciudad: {type: String, require: true},
    telefono: {type: Number, require: true},
    validTelefono: {type: Boolean, require: true, default: false},
    perfilProfesional: {type: String, require: true},
    validPerfilProfesional: {type: Boolean, require: true, default: false},
    imgDir: {type: String, require: true},
    validImgDir: {type: Boolean, require: true, default: false},
    commentValidation: {type: String, require: true, default: 'sin validar'},
    correctProfile: {type: Boolean, require: true, default: false},
    validationProfile: {type: Boolean, require: true, default: false},
    createdAt: {type: Date, require:true, default: new Date()}
});

module.exports = Natural;