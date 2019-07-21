var mongoose = require("mongoose");
var validate = require("mongoose-validator"); // mongoose validator via validate.js

var nameValidator = [
    validate({
        validator: "isLength",
        arguments: [3, 30],
        message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
    }),
    validate({
        validator: "matches",
        arguments: /^[\w\-\s]+$/i,
        message: "Name must be alphanumeric",
    }),
]

const PlayerSchema = new mongoose.Schema({
    name: {
        required: [true, "Name is required"],
        type: String,
        validate: nameValidator,
    },
    pos: {
        type: String,
    },
    status: {
        game1: {
            type: String,
        },
        game2: {
            type: String,
        },
        game3:{
            type: String,
        },
    },
}, { timestamps: true});
// automatically creates "createdAt" & "updatedAt" with ISODate value
// will auto update "updatedAt"

mongoose.model("Player", PlayerSchema);