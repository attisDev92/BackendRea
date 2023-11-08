const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signToken = _id => jwt.sign({ _id }, process.env.VERIFYSTRING);

//rutas para login y register de usuario
const UserAuth = {
    register: async(req, res) => {
        const { body } = req;

        try {
            const isUser =  await Users.findOne({ user: body.user });
            if(isUser) res.status(403).send('ya existe el usuario');
            const userCedula = await Users.findOne({ cedula: body.cedula })
            if(userCedula) res.status(400).send('ya existe un usuario con su número de identificación');

            let juridico = false;
            let natural = false;

            if(body.cedula.length === 10) {
                natural = true;
            } else if (body.cedula.length === 13) {
                juridico = true;
            } else {
                return res.status(400).send('número de cedula invalido');
            }

            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(body.password, salt);
            const user = Users.create({ 
                user: body.user,
                cedula: body.cedula,
                password: hashed,
                salt: salt,
                juridico: juridico,
                natural: natural,
            });

            res.status(201).send('usuario creado')

        } catch {err => {
            console.error(err);
            res.status(500).send(err.message);
        }}
    },

    authMail: async (req, res) => {
        const {body} = req;
        console.log(body);
        try {
            const user = await Users.findOne({ _id: body.id });
    
            if(!user) res.status(404),send('El usuario no existe');
    
            await Users.updateOne({ _id: body.id }, { $set: { auth:true }, upsert: true });
            res.status(200).send('email verificado');
        } catch (err) {
            console.error(err);
            send.status(401).send('error: codigo invalido');
        }
    },

    login: async(req, res) => {
        const { body } = req;

        try {
            const userData = await Users.findOne({ user: body.user });
            if(!userData) res.status(403).send('usuario y/o password incorrecto');
            const isMatch = await bcrypt.compare(body.password, userData.password);
            if(isMatch) {
                const signed = signToken(userData._id);
                res.status(200).json({ userData, signed});
            } else {
                res.status(403).send('usuario y/o password incorrecto');
            }
        
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    },

    getUser: async(req, res) => {
        const id = req.userId;
        
        try {
            const user = await Users.findOne({ _id: id });
    
            if (!user) {
                return res.status(401).send('usuario no encontrado');
            }
            res.json(user);
        
        } catch (err) {
            console.err(err);
            res.status(500).send(err.message)
        }
    }

}
module.exports = UserAuth;