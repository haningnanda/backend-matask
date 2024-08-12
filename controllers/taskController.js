const { default: mongoose } = require('mongoose');
const Task = require('../models/task.model');
const ProjectModel = require('../models/project.model');

const createTask = async (req,res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const deadline = req.body.deadline;
        const project = req.body.project;
        const userId = req.cookies.userId;

        if (name && project) {
            const ProjectData = await ProjectModel.findById(project).populate('user');
            if (!ProjectData) {
                return res.status(404).json({
                    message: "No project found"
                })
            } else if (ProjectData.user._id !== userId) {
                const task = await Task.create({
                    name,
                    description,
                    deadline,
                    project
                })
                return res.json(task)
            } else {
                return res.status(403)
            }
            
        } else {
            return res.status(401).json({
                message: "Please fill the form"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

const getTaskByProjectId = async (req,res) => {
    try {
        const {projectId} = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID format"
            })
        }

        const tasks = await Task.find({project: projectId}).populate({
            path: 'project',
            populate: {
                path: 'user'
            }
        })
        
        if (tasks.length === 0) {
            return res.status(404).json({
                message: "No task found for this project"
            })
        } else if(tasks[0].project.user._id.toString() !== req.cookies.userId) {
            return res.status(403).json({
                message: "Access Denied"
            })
        } else {
            res.json(tasks)
        }

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

const getDetailTaskByTaskId = async (req,res) => {
    try {
        const {taskId} = req.params;

        if (!mongoose.Types.ObjectId.isValid) {
            return res.status(400).json({
                message: "Invalid Task ID format"
            })
        }

        const task = await Task.findById(taskId).populate({
            path: 'project',
            populate: {
                path: 'user'
            }
        })

        if (!task) {
            return res.status(404).json({
                message: "No task found"
            })
        } else if (task.project.user._id.toString() !== req.cookies.userId) {
            return res.status(403).json({
                message: "Access Denied"
            })
        } else {
            res.json(task)
        }

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

const updateTaskByTaskId = async (req,res) => {
    try {
        const {taskId} = req.params;
        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid) {
            return res.status(400).json({
                message: "Invalid Task ID format"
            })
        }

        const task = await Task.findById(taskId).populate({
            path: 'project',
            populate: {
                path: 'user'
            }
        })

        if (!task) {
            return res.status(404).json({
                message: "No task found"
            })
        } else if (task.project.user._id.toString() !== req.cookies.userId) {
            return res.status(403).json({
                message: "Access Denied"
            })
        } else {
            const taskUpdated = await Task.findByIdAndUpdate(taskId, updatedData,{
                new: true,
                runValidators: true
            });
            return res.json(taskUpdated)
        }

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

const deleteTaskByTaskId = async (req,res) => {
    try {
        const {taskId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "Invalid Task ID format"
            })
        }
        
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    createTask,
    getTaskByProjectId,
    getDetailTaskByTaskId,
    updateTaskByTaskId,
    deleteTaskByTaskId
}