const Natural = require('../models/Natural');
const Juridico = require('../models/Juridico');
const Espacio = require('../models/Espacio');
const Gestor = require('../models/Gestor');
const multer = require('multer');

    // Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Rutas para registro de usuarios
const RegisterProfile = {

    juridico: upload.fields([{ name: 'imgRuc' }, { name: 'imgDir' }], async (req, res) => {
        const { body, files } = req; 

        try {
            const juridico = await Juridico.create({
                userId: body.userId,
                nombreComercial: body.nombreComercial,
                nombreRepresentante: body.nombreRepresentante,
                apellidoRepresentante: body.apellidoRepresentante,
                direccion: body.direccion,
                provincia: body.provincia,
                ciudad: body.ciudad,
                celular: body.celular,
                telefono: body.telefono,
                imgDir: files.imgDir[0].filename,
                imgRuc: files.imgRuc[0].filename,
            });

            res.status(200).send('jurídico creado');

        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }),

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
                perfilProfesiona: body.perfilProfesiona,
                urlUbicacion: body.urlUbicacion
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
                provincial: body.provincia,
                ciudad: body.ciudad,
                descripcion: body.descripcion,
                aforo: body.aforo,
                equipoProyeccion: body.equipoProyeccion,
                tipoDeReproductor: body.tipoDeReproductor,
                equipoAudio: body.equipoAudio,
                otrosServicios: body.otrosServicios,
                publicoPrivado: body.publicoPrivado,
                urlFotosEspacio: body.urlFotosEspacio,
                urlLogo: body.urlLogo,
                urlNombramientoAutorizacion: body.urlNombramientoAutorizacion
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
                urlAutorizacion: body.urlAutorizacion,
                urlFotoLogo: body.urlFotoLogo,
            });
            res.status(200).send('gestor creado');

        } catch (err) {
            console.error(err)
            res.status(500).send(err.message)
        }
    },
}

module.exports = RegisterProfile;

