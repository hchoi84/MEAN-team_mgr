var mongoose = require("mongoose");
var validate = require("mongoose-validator"); // mongoose validator via validate.js

var stringValidator = [
    validate({
        validator: "isLength",
        arguments: [3, 50],
        message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
    }),
]

const CommentSchema = new mongoose.Schema({
    playerId: {
        type: String,
    },
    name: {
        required: [true, "Name is required"],
        type: String,
        validate: stringValidator,
    },
    subject: {
        required: [true, "Subject is required"],
        type: String,
        validate: stringValidator,
    },
    content: {
        required: [true, "Comment is required"],
        type: String,
        validate: stringValidator,
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    
}, { timestamps: true});
// automatically creates "createdAt" & "updatedAt" with ISODate value
// will auto update "updatedAt"

mongoose.model("Comment", CommentSchema);