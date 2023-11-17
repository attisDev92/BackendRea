const  { verify, decode } = require('jsonwebtoken')
require('dotenv').config();

//Middleware
const verifyToken = async (req, res, next) => {
    
    const token = req.header("Authorization");
  
    if (!token) {
        return res.status(401).send("Acceso denegado");
    }
  
    try {
        const verified = await verify(token, process.env.VERIFYSTRING);
        req.user = verified;
        const decoded = decode(token);
        req.id = decoded._id;
        next();
    } catch (err) {
        res.status(400).json({ error: "Token no válido" });
    }
  };

module.exports = verifyToken;
