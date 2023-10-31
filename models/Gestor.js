const mongoose = require('mongoose');

const Gestor = mongoose.model( 'Gestor', {
    userId: {type: String, require: true},
    proyecto: {type: String, require: true},
    validProyecto: {type: Boolean, require: true, default: false},
    urlAutorizacion: {type: String, require: true},
    validProyecto: {type: Boolean, require: true, default: false},
    urlFotoLogo: {type: String, require: true},
    validProyecto: {type: Boolean, require: true, default: false},
    commentValidation: {type: String, require: true, default: 'sin validar'},
    createdAt: {type: Date, require: true, default: new Date()}
})

module.exports = require('Gestor');