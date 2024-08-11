const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel