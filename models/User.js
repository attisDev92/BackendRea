const mongoose = require('mongoose');

const User = mongoose.model( 'User', {
    user: {type: String, require:true, unique:true},
    password: {type:String, require:true},
    cedula: {type:String, require:true, unique:true},
    sailt: {type: String, require:true},
    authenticate: {type: Boolean},
    juridico: {type: Boolean, require:true},
    natural: {type: Boolean, require:true},
    espacio: {type: Boolean, require:true, default: false},
    gestor: {type: Boolean, require:true, default: false},
    aut_code: {type: String, require: true},
    auth: {type:Boolean, require:true, default: true},
    createdAt: {type: Date, require:true, default: new Date()}
});

module.exports = User;