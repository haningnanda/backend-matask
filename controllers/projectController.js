const Project = require('../models/project.model');
const User = require("../models/user.model")

const createProject = async (req, res) => {
    try {
        const name = req.body.name
        const description = req.body.description
        const userId = req.cookies.userId
        
        if(name && description && userId){
            const exist = await User.findById(userId);
            if (exist) {
                const project = await Project.create({
                    name,
                    description,
                    userId
                });
                return res.json(project)
            } else {
                res.status(401).json({
                    message: "User doesn't exist"
                })
            }
        } else {
            return res.status(401).json({
                message: "Please send name, description, and UserId as body"
            })
        }
    } catch (err) {
        console.log(err);
    }
}

const getProject = async (req, res) => {
    try {
        const userId = req.cookies.userId
        const projects = await Project.find({userId: userId})
        if (projects.length == 0) {
            return res.status(404).json({
                message : "No project found for this user"
            })
        } else {
            return res.json(projects)
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    createProject,
    getProject
}