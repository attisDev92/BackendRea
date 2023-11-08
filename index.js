//frameworks y librerias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const verifyToken = require('./middleweres/authenticated.middleware');

//rutas
const UserAuth = require('./routes/UserAuth');
const RegisterProfile = require('./routes/RegisterProfile');

//configuracion
const mongooseConnect = require('./config/database');
mongooseConnect();

//inicializando express
const app = express();

//middlewars
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));

app.get('/', (req, res) => {
    res.send('api rea system')
});

//rutas de registtro
app.post('/api/register', UserAuth.register);

//ruta de login
app.post('/api/login', UserAuth.login);
app.get('/api/login', verifyToken, UserAuth.getUser);

//ruta de autenticacion mail
app.patch('/api/authmail', UserAuth.authMail);

//ruta de registro de nuevo juridico
app.post('/api/registerJuridico', verifyToken, RegisterProfile.juridico);

//ruta de registro de nueva persona natural
app.post('/api/registerNatural', verifyToken, RegisterProfile.natural);

//ruta de registro de nuevo espacio
app.post('/api/registerEspacio', verifyToken, RegisterProfile.espacio);

//ruta de registro de nuevo gestor
app.post('/api/registerGestor', verifyToken, RegisterProfile.gestor);

//esuchar en el puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
});