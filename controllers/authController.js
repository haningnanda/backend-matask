const User = require('../models/user.model');
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const registerUser = async (req,res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password;
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        }
        if(!password || password.length < 6){
            return res.json({
                error: "Password is required and should be at least 6 characters long"
            })
        }
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: "Email is taken already"
            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name, 
            email, 
            password : hashedPassword
        });
        return res.json(user)
    } catch (err) {
        console.log(err);
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.json({
                error: "User is not found"
            })
        }
        const matched = await comparePassword(password, user.password)
        if (matched) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token)=>{
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        else {
            return res.json({
                error: "Your password is wrong"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token')
    res.json({message: 'Logged out successfully'})
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}