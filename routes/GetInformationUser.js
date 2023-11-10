const Espacio = require('../models/Espacio');
const Gestor = require('../models/Gestor');
const Juridico = require('../models/Juridico');
const Natural = require('../models/Natural');

//rutas para login y register de usuario
const GetInformationUser = {

    getJuridico: async(req, res) => {
        const id = req.userId;
        
        try {
            const juridico = await Juridico.findOne({ userId: id });
    
            if (!juridico) {
                return res.status(404).send('juridico no encontrado');
            }
            res.status(200).json(juridico);
        
        } catch (err) {
            console.error(err);
            res.status(500).send(err.message)
        }
    },

    getNatural: async(req, res) => {
        const id = req.userId;

        try {
            const natural = await Natural.findOne({ userId: id });

            if(!natural) {
                return res.status(404).send('natural no encontrado');
            }

            res.status(200).json(natural);

        } catch (err) {
            console.error(err);
            res.status(500).send(err.message)
        }
    },

    getEspacios: async(req, res) => {
        const id = req.userId;

        try {
            const espacios =  await Espacio.find({ userId: id });

            if(! espacios.length === 0) {
                return res.status(404).send('no hay espacios registrados por el usuario');
            }

            res.status(200).json(espacios);

        } catch (err) {
            console.error(err);
            res.status(500).send(err.message)
        }
    },

    getGestor: async(req, res) => {
        const id = req.userId;

        try {
            const gestor = await Gestor.findOne({ userId: id });

            if(!gestor) {
                return res.status(404).send('el usuario no esta registrado como gestor');
            }

            res.status(200).json(gestor);

        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }


}

module.exports = GetInformationUser;