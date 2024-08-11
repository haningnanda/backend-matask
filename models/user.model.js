const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true
        },
        password: String
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;