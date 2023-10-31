const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();require('dotenv').config();

const Users = require('./models/User');
const transporter = require('./config/mial.config');
const User = require('./models/User');

const PORT = process.env.PORT;
mongoose.connect(process.env.DATABASE_REA);

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));

const signToken = _id => jwt.sign({ _id }, process.env.VERIFYSTRING);

app.get('/', (req, res) => {
    res.send('api rea system')
});

app.post('/api/register', async(req, res) => {
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
        
        const userCreated = await Users.findOne({ user: body.user });

        res.status(201).send(userCreated._id)

    } catch {err => {
        console.error(err);
        res.status(500).send(err.message);
    }}
});

app.post('/api/login', async(req, res) => {
    const { body } = req;

    try {
        const user = await Users.findOne({ user: body.user });
        if(!user) res.status(403).send('usuario y/o password incorrecto');
        const isMatch = await bcrypt.compare(body.password, user.password);
        if(isMatch) {
            const signed = signToken(user._id);
            res.status(200).json({toke: signed});
        } else {
            res.status(403).send('usuario y/o password incorrecto');
        }
    
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.patch('/api/authmail', async (req, res) => {
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
});

app.post('/api/registerJuridico', async(req, res) => {
    const { body } = req;

    try {

    } catch (err) {
        console.error(err),
        res.status(500)
    }
});

app.post('/api/registerNatural', async(req, res) => {
    const { body } = req;
    
    try {
        
    } catch (err) {
        console.error(err),
        res.status(500)
    }
});

app.post('/api/registerEspacio', async(req, res) => {
    const { body } = req;
    
    try {
        
    } catch (err) {
        console.error(err),
        res.status(500)
    }
});

app.post('/api/registerGestor', async(req, res) => {
    const { body } = req;
    
    try {
        
    } catch (err) {
        console.error(err),
        res.status(500)
    }
});

app.post('/api/admin', async(req, res) => {
    const { body } = req;

    try {

    } catch (err) {
        console.error(err);
        send.status(500);
    }
});

//Middleware
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).send('acceso denegado');

    try {
        const verified = jwt.verify(token, process.env.VERIFYSTRING);
        req.user = verified;
        
        next();

    } catch (err) {
        res.status(400).jason({ error: 'Token no alido' })
    }
};

const findAndAssignUser = async(req, res, next) => {
    try{
        const user = await User.findOne({ _id: req.user._id })
        if(!user) {
            return res.status(401).end();
        }
        req.user = user
        next();
    } catch (err) {
        next(err);
    }
};

const isAuthenticated = express.Router().use(verifyToken, findAndAssignUser);

app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
})