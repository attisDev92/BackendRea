const Natural = require('../models/Natural');
const Juridico = require('../models/Juridico');
const Espacio = require('../models/Espacio');
const Gestor = require('../models/Gestor');
const { uploadEspacio, uploadNatural, uploadJuridico, uploadGestor } = require('../config/multerConfig');


// Rutas para registro de usuarios
const RegisterProfile = {

    juridico: async (req, res) => {

        const storageJuridico = uploadJuridico;

        try {
            const [ imgDir, imgRuc ] = await storageJuridico.array(req, res);

            if(!imgDir || !imgRuc) {
                return res.status(400).send('error al subir archivos');
            }

            const juridicoData = {
                userId: req.body.userId,
                nombreComercial: req.body.nombreComercial,
                nombreRepresentante: req.body.nombreRepresentante,
                apellidoRepresentante: req.body.apellidoRepresentante,
                direccion: req.body.direccion,
                provincia: req.body.provincia,
                ciudad: req.body.ciudad,
                celular: req.body.celular,
                telefono: req.body.telefono,
                imgDir: imgDir[0].filename,
                imgRuc: imgRuc[0].filename,
            };

            const juridico = await Juridico.create(juridicoData);

            res.status(200).send('Juridico creado');

        } catch (err) {
            console.error(err);
            return res.status(500).send('error en la carga de archivos');
        }

    },

    natural: async(req, res) => {
        const { body } = req;
        try {
            const natural = Natural.create({
                userId: body.userId,
                nombre: body.nombre,
                apellido: body.apellido,
                direccion: body.direccion,
                provincia: body.provincia,
                ciudad: body.ciudad,
                celular: body.celular,
                telefono: body.telefono,
                perfilProfesional: body.perfilProfesional,
                imgDir: body.imgDir
            });
            res.status(200).send('persona natural creada');

        } catch (err) {
            console.error(err)
            res.status(500).send(err.message)
        }
    },

    espacio: async(req, res) => {
        const { body } = req;
        try {
            const espacio = Espacio.create({
                userId: body.userId,
                nombreEspacio: body.nombreEspacio,
                nombreResponsable: body.nombreResponsable,
                cargoResponsable: body.cargoResponsable,
                celularResponsable: body.celularResponsable,
                mailResponsable: body.mailResponsable,
                tipoDeEspacio: body.tipoDeEspacio,
                direccionEspacio: body.direccionEspacio,
                provincia: body.provincia,
                ciudad: body.ciudad,
                descripcion: body.descripcion,
                aforo: body.aforo,
                equipoProyeccion: body.equipoProyeccion,
                tipoDeReproductor: body.tipoDeReproductor,
                equipoAudio: body.equipoAudio,
                otrosServicios: body.otrosServicios,
                publicoPrivado: body.publicoPrivado,
                imgLogo: body.imgLogo,
                fotoEspacio1: body.fotoEspacio1,
                fotoEspacio2: body.fotoEspacio2,
                fotoEspacio3: body.fotoEspacio3,
                imgAutorizacion: body.imgAutorizacion,
                
            })
            res.status(200).send('espacio creado');

        } catch (err) {
            console.error(err)
            res.status(500).send(err.message)
        }
    },

    gestor: async(req, res) => {
        const { body } = req;
        try {
            const gestor = Gestor.create({
                userId: body.userId,
                proyecto: body.proyecto,
                imgAutorizacion: body.imgAutorizacion,
                imgFotoLogo: body.imgFotoLogo,
            });
            res.status(200).send('gestor creado');

        } catch (err) {
            console.error(err)
            res.status(500).send(err.message)
        }
    },
}

module.exports = RegisterProfile;

