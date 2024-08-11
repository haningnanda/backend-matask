const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
    return new Promise((resolve, reject) =>{
        bcrypt.genSalt(12, (err, salt)=>{
            if(err){
                reject(err)
            }
            bcrypt.hash(password, salt, (err,hash)=> {
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

const authLogout = (req,res,next) => {
    const token = req.cookies.token;
    if (token) {
        return res.status(401).json({
            message: "Already logged in"
        })
    }
    else {
        res.json({
            message: "There is no token"
        })
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    authenticate,
    authLogout
}