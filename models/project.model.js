const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        description: String
    },
    {
        timestamps: true
    }
)

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel