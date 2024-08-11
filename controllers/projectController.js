const { default: mongoose } = require('mongoose');
const Project = require('../models/project.model');
const User = require("../models/user.model")

const createProject = async (req, res) => {
    try {
        const name = req.body.name
        const description = req.body.description
        const user = req.cookies.userId
        
        if(name && description && user){
            const exist = await User.findById(user);
            if (exist) {
                const project = await Project.create({
                    name,
                    description,
                    user
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
        const projects = await Project.find({user: userId})
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

const getProjectById = async (req,res) => {
    try {
        const { projectId } = req.params;
        const userId = req.cookies.userId;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID format"
            })
        }
        const project = await Project.findById(projectId).populate('user')

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            })
        } else if(project.user._id.toString() !== userId){
            return res.status(403).json({
                message: "Access denied"
            })
        } else {
            return res.json(project)
        }

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

const updateProjectById = async (req,res) => {
    try {
        const { projectId } = req.params;
        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID format"
            })
        }

        const project = await Project.findByIdAndUpdate(projectId, updatedData,{
            new: true,
            runValidators: true
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project)
    } catch (err) {
        return res.status(500).json({
            error: err
        })
    }
}

const deleteProjectById = async (req,res) => {
    try {
        const {projectId} = req.params
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID format"
            })
        }

        const project = await Project.findByIdAndDelete(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
          }
      
          res.json({ message: 'Project deleted successfully' });

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    createProject,
    getProject,
    getProjectById,
    updateProjectById,
    deleteProjectById
}