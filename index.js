//frameworks y librerias
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//rutas
const UserAuth = require('./routes/UserAuth');

//configuracion
const mongooseConnect = require('./config/database');
mongooseConnect();

//inicializando express
const app = express();
const router = express.Router();

//middlewars
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));

// const isAuthenticated = router.use(verifyToken, findAndAssignUser);

app.get('/', (req, res) => {
    res.send('api rea system')
});

//rutas de registtro
app.post('/api/register', UserAuth.register);

//ruta de login
app.post('/api/login', UserAuth.login);

//ruta de autenticacion mail
app.patch('/api/authmail', UserAuth.authMail);

//esuchar en el puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
})