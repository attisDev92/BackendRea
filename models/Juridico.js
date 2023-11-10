const mongoose = require('mongoose');

const Juridico = mongoose.model( 'Juridico', {
    userId: {type: String, require:true},
    nombreComercial: {type: String, require:true},
    nombreRepresentante: {type: String, require:true},
    apellidoRepresentante: {type: String, require: true},
    direccion: {type: String, require:true},
    provincia: {type: String, require:true},
    ciudad: {type: String, require: true},
    telefono: {type: Number, require: true},
    validTelefono: {type: Boolean, require: true, default: false},
    imgDir: {type: String, require: true},
    validImgDir: {type: Boolean, require: true, default: false},
    imgRuc: {type: String, require: true},
    validImgRuc: {type: Boolean, require: true, default: false},
    validationComment: {type:String, default: 'sin validar'},
    correctProfile: {type: Boolean, require: true, default: false},
    valitationProfile: {type: Boolean, require: true, default: false},
    createdAt: {type: Date, require:true, default: new Date()}
});

module.exports = Juridico;