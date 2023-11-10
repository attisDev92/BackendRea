const mongoose = require('mongoose');

const User = mongoose.model( 'User', {
    user: {type: String, require:true, unique:true},
    password: {type:String, require:true},
    cedula: {type:String, require:true, unique:true},
    salt: {type: String, require:true},
    juridico: {type: Boolean, require:true},
    natural: {type: Boolean, require:true},
    registerJuridico: {type: Boolean, require: true, default: false},
    registerNatural: {type: Boolean, require: true, default: false},
    registerEspacio: {type: Boolean, require: true, default: false},
    registerGestor: {type: Boolean, require: true, default: false},
    authenticate_code: {type: String, require: true},
    authenticate: {type:Boolean, require:true, default: true},
    createdAt: {type: Date, require:true, default: new Date()}
});

module.exports = User;