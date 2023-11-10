const Natural = require('../models/Natural');
const Juridico = require('../models/Juridico');
const Espacio = require('../models/Espacio');
const Gestor = require('../models/Gestor');
const User = require('../models/User');
const { uploadJuridico, uploadNatural, uploadEspacio, uploadGestor } = require('../config/multer.config');

// Rutas para registro de usuarios
const RegisterProfile = {

    juridico: async(req, res) => {
        
        const isJuridico = await Juridico.findOne({ userId: req.body.userId });
        if(isJuridico) {
            return res.status(403).send('ya se encuentra registrado')
        }

        uploadJuridico (req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }
            
            try {
                const juridicoData = {
                    userId: req.body.userId,
                    nombreComercial: req.body.nombreComercial,
                    nombreRepresentante: req.body.nombreRepresentante,
                    apellidoRepresentante: req.body.apellidoRepresentante,
                    direccion: req.body.direccion,
                    provincia: req.body.provincia,
                    ciudad: req.body.ciudad,
                    telefono: req.body.telefono,
                    imgDir: req.files.imgDir[0].filename,
                    imgRuc: req.files.imgRuc[0].filename,
                };

                const juridico = await Juridico.create(juridicoData);

                const user = await User.findOne({ _id: req.body.userId })
                user.registerJuridico = true;
                await user.save();

                res.status(201).send('Jurídico creado');

            } catch (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
        });
    },

    natural: async(req, res) => {

        const isNatural = await Natural.findOne({ userId: req.body.userId });
        if(isNatural){
            return res.status(403).send('ya se encuentra registrado');
        }

        uploadNatural(req, res, async (err) => {
            if(err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }

            try {
                const naturalData = {
                    userId: req.body.userId,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    direccion: req.body.direccion,
                    provincia: req.body.provincia,
                    ciudad: req.body.ciudad,
                    telefono: req.body.telefono,
                    perfilProfesional: req.body.perfilProfesional,
                    imgDir: req.files.imgDir[0].filename
                }

                const natural = await Natural.create(naturalData);

                const user = await User.findOne({ _id: req.body.userId })
                user.registerNatural = true;
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

            try {
                const espacioData = {
                    userId: req.body.userId,
                    nombreEspacio: req.body.nombreEspacio,
                    nombreResponsable: req.body.nombreResponsable,
                    cargoResponsable: req.body.cargoResponsable,
                    celularResponsable: req.body.celularResponsable,
                    mailResponsable: req.body.mailResponsable,
                    tipoDeEspacio: req.body.tipoDeEspacio,
                    direccionEspacio: req.body.direccionEspacio,
                    provincia: req.body.provincia,
                    ciudad: req.body.ciudad,
                    descripcion: req.body.descripcion,
                    aforo: req.body.aforo,
                    equipoProyeccion: req.body.equipoProyeccion,
                    equipoReproductor: req.body.equipoReproductor,
                    equipoAudio: req.body.equipoAudio,
                    otrosServicios: req.body.otrosServicios,
                    publicoPrivado: req.body.publicoPrivado,
                    imgLogo: req.files.imgLogo[0].filename,
                    fotoEspacio1: req.files.fotoEspacio1[0].filename,
                    fotoEspacio2: req.files.fotoEspacio2[0].filename,
                    fotoEspacio3: req.files.fotoEspacio3[0].filename,
                    imgAutorizacion: req.files.imgAutorizacion[0].filename
                };

                const espacio = await Espacio.create(espacioData);

                const user = await User.findOne({ _id: req.body.userId })
                user.registerEspacio = true;
                user.save();

                res.status(201).send('espacio creado');

            } catch (err) {
                console.error(err)
                res.status(500).send(err.message)
            };
        });
    },

    gestor: async(req, res) => {
        uploadGestor(req, res, async(err) => {
            if(err) {
                console.error(err);
                return res.status(500).send('Error al subir imágenes');
            }

            try {
                const gestorData = {
                    userId: req.body.userId,
                    proyecto: req.body.proyecto,
                    imgAutorizacion: req.files.imgAutorizacion ? req.files.imgAutorizacion[0].filename : null,
                    imgFotoLogo: req.files.imgFotoLogo[0].filename,
                };

                const gestor = await Gestor.create(gestorData);
                const user = await User.findOne({ _id: req.body.userId });
                user.registerGestor = true;
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

