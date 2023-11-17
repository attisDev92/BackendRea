const User = require('../models/User');
const { uploadJuridico, uploadNatural, uploadEspacio, uploadGestor } = require('../config/multer.config');

// Rutas para registro de usuarios
const RegisterProfile = {

    juridico: async(req, res) => {
        
        const user = await User.findOne({ _id: req.body.userId });
        if(user.juridicoData) {
            return res.status(403).send('ya se encuentra registrado como usuario juridico')
        }

        uploadJuridico (req, res, async (err) => {

            const body = req.body;

            if (err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }
            
            try {
                const user = await User.findOne({ _id: req.body.userId })

                user.nombre = req.body.nombreRepresentante;
                user.validNombre = false;
                user.apellido = body.apellidoRepresentante;
                user.validApellido = false;
                user.nombreComercial = body.nombreComercial
                user.validNombreComercial = false;
                user.direccion = body.direccion;
                user.validDireccion = false;
                user.provincia = body.provincia;
                user.validProvincia = false;
                user.ciudad = body.ciudad;
                user.validCiudad = false;
                user.telefono = body.telefono;
                user.validTelefono = false;
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

        const user = await User.findOne({ _id: req.body.userId });

        if(user.naturalData){
            return res.status(403).send('ya se encuentra registradocomo persona natural');
        }

        uploadNatural(req, res, async (err) => {

            const body = req.body

            if(err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }

            const user = await User.findOne({ _id: body.userId })

            try {
                user.nombre = req.body.nombreRepresentante;
                user.validNombre = false;
                user.apellido = body.apellidoRepresentante;
                user.validApellido = false;
                user.nombreComercial = body.nombreComercial
                user.validNombreComercial = false;
                user.direccion = body.direccion;
                user.validDireccion = false;
                user.provincia = body.provincia;
                user.validProvincia = false;
                user.ciudad = body.ciudad;
                user.validCiudad = false;
                user.telefono = body.telefono;
                user.validTelefono = false;
                user.naturalData = {
                    perfilProfesional: body.perfilProfesional,
                    validPerfilProfesional: false,
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
            
            const body = req.body;

            const user = await User.findOne({ _id: body.userId })

            try {
                
                user.espacio = true;
                user.nombreEspacio = body.nombreEspacio;
                user.nombreResponsable = body.nombreResponsable;
                user.cargoResponsable = body.cargoResponsable;
                user.celularResponsable = body.celularResponsable;
                user.validCelularResponsable = false;
                user.mailResponsable = body.mailResponsable;
                user.validMailResponsable = false;
                user.tipoDeEspacio = body.tipoDeEspacio;
                user.direccionEspacio = body.direccionEspacio;
                user.provincia = body.provincia;
                user.ciudad =  body.ciudad;
                user.descripcion = body.descripcion;
                user.validDescripcion = false;
                user.aforo = body.aforo;
                useer.validAforo = false;
                user.equipoProyeccion = body.equipoProyeccion;
                user.equipoReproductor = body.equipoReproductor;
                user.equipoAudio = body.equipoAudio;
                user.otrosServicios = body.otrosServicios;
                user.publicoPrivado = body.publicoPrivado;
                user.imgLogo =  req.files.imgLogo[0].filename;
                user.validImgLogo = false;
                user.fotoEspacio1 = req.files.fotoEspacio1[0].filename;
                user.validFotoEspacio1 = false;
                user.fotoEspacio2 = req.files.fotoEspacio2[0].filename;
                user.validFotoEspacio2 = false;
                user.fotoEspacio3 = req.files.fotoEspacio3[0].filename;
                user.validFotoEspacio3 = false;
                user.imgAutorizacion = req.files.imgAutorizacion[0].filename;
                user.validImgAutorizacion = false;
                user.commentValidation ='sin validar';
                user.correctProfile = false;
                user.validationProfile = false;
                user.acuerdo = false;
                user.createdAt = new Date();
                
                user.save();

                res.status(201).send('espacio creado');

            } catch (err) {
                console.error(err)
                res.status(500).send(err.message)
            };
        });
    },

    gestor: async(req, res) => {

        const user = User.findOne({ _id: req.body.userId });

        if(user.gestorData) {
            return res.status(403).send('ya se encuentra registrado como persona usuario del banco de contenidos');
        }

        uploadGestor(req, res, async(err) => {

            if(err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }

            const body = req.body;

            try {

                const user = await User.findOne({ _id: req.body.userId });

                user.gestor = true;
                user.proyecto = body.proyecto;
                user.validProyecto = false;
                user.imgAutorizacion = req.files.imgAutorizacion ? req.files.imgAutorizacion[0].filename : null;
                user.validImgAutorizacion = false;
                user.imgFotoLogo = req.files.imgFotoLogo[0].filename;
                user.validImgFotoLogo = false;
                user.commentValidation = 'sin validar';
                user.correctProfile = false;
                user.validationProfile = false;
                user.acuerdo = false;
                user.createdAt = new Date();

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

