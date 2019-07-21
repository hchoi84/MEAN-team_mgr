const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
var moment = require("moment"); // formatting dates in ejs
var bcrypt = require("bcrypt");

module.exports = {
    create: (req, res) => {
        var comment = new Comment({
            playerId: req.body.playerId,
            name: req.body.name,
            subject: req.body.subject,
            content: req.body.content,
            likes: 0,
            dislikes: 0,
        });
        comment.save(err => {
            if (err){
                console.log("CREATING FAILED!");
                let message = {"message": "error occured"};
                for (var key in err.errors){
                    message[key] = err.errors[key].message;
                }
                console.log(message);
                res.json(message);
            }else{
                console.log("CREATION SUCCESS!");
                res.json(comment)
            }
        });
    },

    addLike: (req, res) => {
        Comment.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}}, (err, comment) => {
            if (err){
                console.log("ADDING LIKE FAILED");
                res.json(comment);
            }else{
                console.log("ADDING LIKE SUCCESS!")
                res.json(comment);
            }
        })
    },

    addDislike: (req, res) => {
        Comment.findByIdAndUpdate(req.params.id, {$inc: {dislikes: 1}}, (err, comment) => {
            if (err){
                console.log("ADDING LIKE FAILED");
                res.json(comment);
            }else{
                console.log("ADDING LIKE SUCCESS!")
                res.json(comment);
            }
        })
    },

    getComments: (req, res) => {
        Comment.find({playerId: req.params.pid}, (err, comments) => {
            if (err){
                console.log("getComments RETRIEVING FAILED!", err);
                res.json(comments);
            }else{
                console.log("RETRIEVING SUCCESS!");
                res.json(comments);
            }
        });
    },

    // getComment: (req, res) => {
    //     Comment.findById(req.params.id, (err, comment) => {
    //         if (err){
    //             console.log("getComment RETRIEVING FAILED!", err);
    //             res.json(comment);
    //         }else{
    //             console.log("RETRIEVING SUCCESS!");
    //             res.json(comment);
    //         }
    //     });
    // },

    // editComment: (req, res) => {
    //     Comment.findByIdAndUpdate(req.params.id, 
    //         {
    //             name: req.body.name,
    //             pos: req.body.pos,
    //             status:{
    //                 game1: req.body.status.game1,
    //                 game2: req.body.status.game2,
    //                 game3: req.body.status.game3,
    //             }

    //         }, {runValidators: true},(err, author) =>{
    //         if (err){
    //             console.log("EDIT FAILED!");
    //             let message = {"message": "error occured"};
    //             for (var key in err.errors){
    //                 message[key] = err.errors[key].message;
    //             }
    //             res.json(message);
    //         }else{
    //             console.log("EDIT SUCCESS!");
    //             res.json(author);
    //         }
    //     });
    // },

    delete: (req, res) =>{
        Comment.findByIdAndDelete(req.params.id, (err, comment) => {
            if (err){
                console.log("DELETE FAILED!");
                res.json(comment);
            }else{
                res.json(comment);
            }
        })
    },

}