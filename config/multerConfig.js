const multer = require('multer');

const generateFileName = (file) => {
    return `${Date.now()}-${Math.round(Math.random()*1E9)}${file.originalname}`;
}

const storageJuridico = multer.diskStorage({
    destination: 'uploads/juridicos',
    filename: (req, file, callback) => {
        callback(null, generateFileName(file));
    }
});

const storageNatural = multer.diskStorage({
    destination: 'uploads/naturales',
    filename: (req, file, callback) => {
        callback(null, generateFileName(file));
    }
});

const storageEspacio = multer.diskStorage({
    destination: 'uploads/espacios',
    filename: (req, file, callback) => {
        callback(null, generateFileName(file));
    }
});

const storageGestor = multer.diskStorage({
    destination: 'uploads/gestores',
    filename: (req, file, callback) => {
        callback(null, generateFileName(file));
    }
});

const uploadJuridico = multer({ storage: storageJuridico });
const uploadNatural = multer({ storage: storageNatural });
const uploadEspacio = multer({ storage: storageEspacio });
const uploadGestor = multer({ storage: storageGestor });

module.exports = { 
    uploadEspacio, 
    uploadGestor, 
    uploadJuridico, 
    uploadNatural
}