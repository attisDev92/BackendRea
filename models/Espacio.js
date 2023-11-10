const mongoose = require('mongoose');

const Espacio = mongoose.model( 'Espacio', {
    userId: {type: String, require: true},
    nombreEspacio: {type: String, require:true},
    nombreResponsable: {type: String, require: true},
    cargoResponsable: {type: String, require: true},
    celularResponsable: {type: String, require: true},
    validCelularResponsable: {type: Boolean, require: true, default: false},    
    mailResponsable: {type: String, require: true},
    validMailResponsable: {type: Boolean, require: true, default: false},    
    tipoDeEspacio: {type: String, require: true},
    direccionEspacio: {type: String, require: true},
    provincia: {type: String, require: true},
    ciudad: {type: String, require: true},
    descripcion: {type: String, require: true},
    validDescripcion: {type: Boolean, require: true, default: false},    
    aforo: {type: String, require: true},
    validAforo: {type: Boolean, require: true, default: false},    
    equipoProyeccion: {type: String, require: true},
    equipoReproductor: {type: String, require: true},
    equipoAudio: {type: String, require: true},
    otrosServicios: {type: String, require: true},
    publicoPrivado: {type: String, require: true},
    imgLogo: {type: String, require: true},
    validImgLogo: {type: Boolean, require: true, default: false},
    fotoEspacio1: {type: String, require: true},
    validFotoEspacio1: {type: Boolean, require: true, default: false},
    fotoEspacio2: {type: String, require: true},
    validFotoEspacio2: {type: Boolean, require: true, default: false},
    fotoEspacio3: {type: String, require: true},
    validFotoEspacio3: {type: Boolean, require: true, default: false},
    imgAutorizacion: {type: String, require: true},
    validImgAutorizacion: {type: Boolean, require: true, default: false},
    commentValidation: {type: String, require: true, default: 'sin validar'},
    correctProfile: {type: Boolean, require: true, default: false},
    validationProfile: {type: Boolean, require: true, default: false},
    createdAt: {type: Date, require: true, default: new Date()}
})

module.exports = Espacio;

