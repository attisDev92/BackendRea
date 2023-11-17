const { json } = require('body-parser');
const mongoose = require('mongoose');

const User = mongoose.model( 'User', {
    user: {type: String, require: true, unique: true},
    password: {type:String, require: true},
    cedula: {type:String, require: true, unique: true},
    salt: {type: String, require: true},
    nombre: {type: String, require:true},
    apellido: {type: String, require: true},
    nombreComercial: {type: String, require: true, default: null},
    direccion: {type: String, require: true},
    provincia: {type: String, require: true},
    ciudad: {type: String, require: true},
    telefono: {type: String, require: true},
    juridico: {type: Boolean, require: true, default: false},
    juridicoData: {type: Object, require: true, default: null},
    natural: {type: Boolean, require: true, default: false},
    naturalData: {type: Object, require: true, default: null},
    espacio : {type: Boolean, require: true, default: false},
    espaciosData: {type: Object, require: true, default: null},
    gestor : {type: Boolean, require: true, default: false},
    gestorData: {type: Object, require: true, default: null},
    authenticate_code: {type: String, require: true, default:null},
    authenticate: {type:Boolean, require:true, default: true},
    createdAt: {type: Date, require:true, default: new Date()}
});

module.exports = User;