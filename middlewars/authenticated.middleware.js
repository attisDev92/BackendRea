const Users = require('../models/User');

//Middleware
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).send('acceso denegado');

    try {
        const verified = jwt.verify(token, process.env.VERIFYSTRING);
        req.user = verified;
        
        next();

    } catch (err) {
        res.status(400).jason({ error: 'Token no alido' })
    }
};

const findAndAssignUser = async(req, res, next) => {
    try{
        const user = await Users.findOne({ _id: req.user._id })
        if(!user) {
            return res.status(401).end();
        }
        req.user = user
        next();
    } catch (err) {
        next(err);
    }
};

module.export = { verifyToken, findAndAssignUser };