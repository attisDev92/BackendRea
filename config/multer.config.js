const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

//configuracionde nombre
const generateUniqueFilename = file => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const originalname = file.originalname.replace(/\s/g, '_');
    const uniqueId= uuidv4();
    return `${timestamp}_${uniqueId}_${originalname}`;
}


// Configuración de carpetas para multer
const storageJuridico = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/juridico');
    },
    filename: function (req, file, cb) {
        cb(null, generateUniqueFilename(file));
    },
});

const storageNatural = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/natural');
    },
    filename: function (req, file, cb) {
        cb(null, generateUniqueFilename(file));
    }
})

const storageEspacio = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/espacio');
    },
    filename: function (req, file, cb) {
        cb(null, generateUniqueFilename(file));
    }
})

const storageGestor = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/gestor');
    },
    filename: function (req, file, cb) {
        cb(null, generateUniqueFilename(file));
    }
})


const uploadJuridico = multer({ storage: storageJuridico,})
    .fields([
        { name: 'imgRuc' }, 
        { name: 'imgDir' }
    ]);
    
const uploadNatural = multer({ storage: storageNatural, })
    .fields([{name: 'imgDir'}]);

const uploadEspacio = multer({ storage: storageEspacio })
    .fields([
        {name: 'imgLogo'}, 
        {name: 'fotoEspacio1'}, 
        {name: 'fotoEspacio2'}, 
        {name: 'fotoEspacio3'}, 
        {name: 'imgAutorizacion'}
    ]);

const uploadGestor = multer({ storage: storageGestor })
    .fields([
        {name: 'imgAutorizacion', optional: true },
        {name: 'imgFotoLogo'}
    ]);

module.exports = {
    uploadJuridico,
    uploadNatural,
    uploadEspacio,
    uploadGestor
}