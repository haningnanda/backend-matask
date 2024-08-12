const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['To do', 'In progress', 'Completed'],
            default: 'To do'
        },
        deadline: {
            type: Date
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const TaskModel = mongoose.model("Task", TaskSchema);
module.exports = TaskModel