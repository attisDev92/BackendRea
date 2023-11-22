const User = require('../models/User');
const { uploadJuridico, uploadNatural, uploadEspacio, uploadGestor } = require('../config/multer.config');
const { v4: uuidv4 } = require('uuid');

// Rutas para registro de usuarios
const RegisterProfile = {

    juridico: async(req, res) => {

        const user = await User.findOne({ _id: req.user._id });

        if(user.juridicoData) {
            return res.status(403).send('ya se encuentra registrado como usuario juridico')
        }

        uploadJuridico (req, res, async (err) => {

            if (err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }

            const { body } = req;
            
            try {
                user.nombre = body.nombreRepresentante;
                user.apellido = body.apellidoRepresentante;
                user.nombreComercial = body.nombreComercial;
                user.direccion = body.direccion;
                user.provincia = body.provincia;
                user.ciudad = body.ciudad;
                user.telefono = body.telefono;
                user.juridicoData = {
                    imgDir: req.files.imgDir[0].filename,
                    validImgDir: false,
                    imgRuc: req.files.imgRuc[0].filename,
                    validImgRuc: false,
                    validationComment: 'sin validar',
                    correctProfile: false,
                    valitationProfile: false,
                };

                await user.save();

                res.status(201).send('Jurídico creado');

            } catch (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
        });
    },

    natural: async(req, res) => {

        const user = await User.findOne({ _id: req.user._id });

        if(user.naturalData){
            return res.status(403).send('ya se encuentra registradocomo persona natural');
        }

        uploadNatural(req, res, async (err) => {

            if(err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }

            const { body } = req;

            try {
                user.nombre = body.nombre;
                user.apellido = body.apellido;
                user.nombreComercial = null;
                user.direccion = body.direccion;
                user.provincia = body.provincia;
                user.ciudad = body.ciudad;
                user.telefono = body.telefono;
                user.perfilProfesional= body.perfilProfesional;
                user.validPerfilProfesional= false;
                user.naturalData = {
                    imgDir: req.files.imgDir[0].filename,
                    validImgDir: false,
                    commentValidation: 'sin validar',
                    correctProfile: false,
                    validationProfile: false
                }

                await user.save();

                res.status(201).send('persona natural creada');

            } catch (err) {
            console.error(err)
            res.status(500).send(err.message)
            }
        });
    },

    espacio: async(req, res) => {
        uploadEspacio(req, res, async (err) => {

            if(err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }

            console.log(req)

            const user = await User.findOne({ _id: req.user._id })
            
            const  { body } = req;

            try {
                
                user.espacio = true,
                user.espaciosData = [ ...user.espaciosData, {
                    id_espacio: uuidv4(),
                    nombreEspacio: body.nombreEspacio,
                    validNombreEspacio: false,
                    nombreResponsable: body.nombreResponsable,
                    validNombreResponsable: false,
                    cargoResponsable: body.cargoResponsable,
                    validCargoResponsable: false,
                    celularResponsable: body.celularResponsable,
                    validCelularResponsable: false,
                    mailResponsable: body.mailResponsable,
                    validMailResponsable: false,
                    tipoDeEspacio: body.tipoDeEspacio,
                    direccionEspacio: body.direccionEspacio,
                    provincia: body.provincia,
                    ciudad:  body.ciudad,
                    descripcion: body.descripcion,
                    validDescripcion: false,
                    aforo: body.aforo,
                    validAforo: false,
                    equipoProyeccion: body.equipoProyeccion,
                    equipoReproductor: body.equipoReproductor,
                    equipoAudio: body.equipoAudio,
                    otrosServicios: body.otrosServicios,
                    publicoPrivado: body.publicoPrivado,
                    imgLogo:  req.files.imgLogo[0].filename,
                    validImgLogo: false,
                    fotoEspacio1: req.files.fotoEspacio1[0].filename,
                    validFotoEspacio1: false,
                    fotoEspacio2: req.files.fotoEspacio2[0].filename,
                    validFotoEspacio2: false,
                    fotoEspacio3: req.files.fotoEspacio3[0].filename,
                    validFotoEspacio3: false,
                    imgAutorizacion: req.files.imgAutorizacion[0].filename,
                    validImgAutorizacion: false,
                    commentValidation:'sin validar',
                    correctProfile: false,
                    validationProfile: false,
                    acuerdo: false,
                    createdAt: new Date(),
                }]
                
                user.save();

                res.status(201).send('espacio creado');

            } catch (err) {
                console.error(err)
                res.status(500).send(err.message)
            };
        });
    },

    gestor: async(req, res) => {

        const user = await User.findOne({ _id: req.user._id });

        if(user.gestorData !== null) {
            return res.status(403).send('ya se encuentra registrado como persona usuario del banco de contenidos');
        }

        uploadGestor(req, res, async(err) => {

            if(err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }
            
            const { body } = req;
            try {

                user.gestor = true;
                user.gestorData = {
                    id_gestor: uuidv4(),
                    proyecto: body.proyecto,
                    validProyecto: false,
                    imgAutorizacion: req.files.imgAutorizacion ? req.files.imgAutorizacion[0].filename : null,
                    validImgAutorizacion: false,
                    imgFotoLogo: req.files.imgFotoLogo[0].filename,
                    validImgFotoLogo: false,
                    commentValidation: 'sin validar',
                    correctProfile: false,
                    validationProfile: false,
                    acuerdo: false,
                    createdAt: new Date(),
                }

                user.save();
                
                res.status(201).send('gestor creado');
    
            } catch (err) {
                console.error(err)
                res.status(500).send(err.message)
            }
        });
    },
}

module.exports = RegisterProfile;

