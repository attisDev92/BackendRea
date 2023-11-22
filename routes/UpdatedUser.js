const  User = require('../models/User');

const UpdateUser = {

    updateProfileData: async (req, res) => {
        const userId = req.user._id;
        const { body } = req;

        try {
            const user = await User.findOne({ _id: userId });

            if(!user) {
                return res.status(400).send('ususario no encontrado');
            }

            Object.keys(body).forEach(key => {
                if(user.schema.path(key)) {
                    user.set(key, body[key])
                }
            })

            await user.save();
            res.status(200).send('se actualizo la informacion')

        } catch (err) {
            console.error(err)
            res.status(500).send('error en el servidor')
        }
    },

    updateGestorData: async (req, res) => {
        const userId = req.user._id;
        const { body } = req;

        try {
            const user = await User.findOne({ _id: userId });

            if(!user) {
                return res.status(400).send('usuario noencontrado');
            }

            if(!user.gestorData || typeof user.gestorData !== 'object') {
                return res.status(400).send('usuario no cuenta con datos de gestor');
            }

            Object.keys(body).forEach(key => {
                if(user.gestorData.hasOwnProperty(key)) {
                    user.gestorData[key] = body[key];
                }
            })

            user.markModified('gestorData');

            await user.save();

            res.status(200).send('se actualizo la informacion');
        } catch (err) {
            console.error(err);
            res.status(500).send('error en el servidor');
        }
    },

    updateEspacioData: async (req, res) => {
        const userId = req.user._id;
        const { body } = req;

        try {
            const user = await User.findOne({ _id: userId })

            if(!user) {
                return res.status(400).send('usuario no encontrado');
            }

            const index = user.espaciosData.findIndex(espacio => espacio.id_espacio === body.id_espacio)

            if(index === -1) {
                return res.status(400).send('espacio no encontrado en el usuario') 
            }

            Object.keys(body).forEach(key => {
                if(user.espaciosData[index].hasOwnProperty(key)) {
                    user.espaciosData[index][key] = body[key];
                }
            })

            user.markModified('espaciosData');

            await user.save();

            res.status(200).send('se actualizo el espacio')

        } catch (err) {
            console.error(err)
            res.status(500).send('error en el servidor')
        }
    }

}

module.exports = UpdateUser; 