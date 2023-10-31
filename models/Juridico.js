const mongoose = require('mongoose');

const Juridico = mongoose.model( 'Juridico', {
    userId: {type: String, require:true},
    nombreComercial: {type: String, require:true},
    validNombreComercial: {type: Boolean, require:true, default:false},
    nombreRepresentante: {type: String, require:true},
    validNombreRepresentante: {type: Boolean, require:true, default: false},
    apellidoRepresentante: {type: String, require: true},
    validApellidoRepresentante: {type: Boolean, require: true, default: false},
    direccion: {type: String, require:true},
    validDireccion: {type: Boolean, require:true, default: false},
    provincia: {type: String, require:true},
    validProvincia: {type: Boolean, require:true, default: false},
    ciudad: {type: String, require: true},
    validCiudad: {type: Boolean, require: true, default: false},
    celular: {type: Number, require: true},
    validCelular: {type: Boolean, require: true, default: false},
    telefono: {type: Number, require: true},
    validTelefono: {type: Boolean, require: true, default: false},
    urlUbicacion: {type: String, require: true},
    validUrlUbicacion: {type: Boolean, require: true, default: false},
    urlRUC: {type: String, require: true},
    validRUC: {type: Boolean, require: true, default: false},
    validationComment: {type:String, default: 'sin validar'},
    createdAt: {type: Date, require:true, default: new Date()}
});

module.exports = Juridico;