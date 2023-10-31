const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signToken = _id => jwt.sign({ _id }, process.env.VERIFYSTRING);

//rutas para login y register de usuario
const RegisterProfile = {

    juridico: async(req, res) => {
        const { body } = req.body;
        try {

        } catch (err) {

        }
    },

    natural: async(req, res) => {
        const { body } = req.body;
        try {

        } catch (err) {

        }
    },

    espacio: async(req, res) => {
        const { body } = req.body;
        try {

        } catch (err) {

        }
    },

    gestor: async(req, res) => {
        const { body } = req.body;
    }
}

module.exports = RegisterProfile;

