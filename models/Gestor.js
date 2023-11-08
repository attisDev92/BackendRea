const mongoose = require('mongoose');

const Gestor = mongoose.model( 'Gestor', {
    userId: {type: String, require: true},
    proyecto: {type: String, require: true},
    validProyecto: {type: Boolean, require: true, default: false},
    imgAutorizacion: {type: String, require: true},
    validImgAutorizacion: {type: Boolean, require: true, default: false},
    imgFotoLogo: {type: String, require: true},
    validImgFotoLogo: {type: Boolean, require: true, default: false},
    commentValidation: {type: String, require: true, default: 'sin validar'},
    acuerdo: {type: Boolean, require: true, default: false},
    createdAt: {type: Date, require: true, default: new Date()}
})

module.exports = Gestor;