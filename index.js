//frameworks y librerias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const verifyToken = require('./middleweres/authenticated.middleware');

//rutas
const UserAuth = require('./routes/UserAuth');
const RegisterProfile = require('./routes/RegisterProfile');
const GetInformationUser = require('./routes/GetInformationUser');

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

//obtener info juridico del user
app.get('/api/juridico', verifyToken, GetInformationUser.getJuridico);

//obtener info natural del user
app.get('/api/natural', verifyToken, GetInformationUser.getNatural);

//obtener datos de gestor del usuario
app.get('/api/gestor', verifyToken, GetInformationUser.getGestor);

//obtener datos de espacios del usuario
app.get('/api/espacios', verifyToken, GetInformationUser.getEspacios);

//esuchar en el puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
});