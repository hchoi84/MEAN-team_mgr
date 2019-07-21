const mongoose = require("mongoose");
const Player = mongoose.model("Player");
var moment = require("moment"); // formatting dates in ejs
var bcrypt = require("bcrypt");

module.exports = {
    create: (req, res) => {
        var player = new Player({
            name: req.body.name,
            pos: req.body.pos,
            status:{
                game1: "",
                game2: "",
                game3: "",
            }
        });
        player.save(err => {
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
                res.json(player)
            }
        });
    },

    getPlayers: (req, res) => {
        Player.find({}, (err, players) => {
            if (err){
                console.log("getPlayers RETRIEVING FAILED!", err);
                res.json(players);
            }else{
                console.log("RETRIEVING SUCCESS!");
                res.json(players);
            }
        });
    },

    getPlayer: (req, res) => {
        Player.findById(req.params.id, (err, player) => {
            if (err){
                console.log("getPlayer RETRIEVING FAILED!", err);
                res.json(player);
            }else{
                console.log("RETRIEVING SUCCESS!");
                res.json(player);
            }
        });
    },

    editPlayer: (req, res) => {
        Player.findByIdAndUpdate(req.params.id, 
            {
                name: req.body.name,
                pos: req.body.pos,
                status:{
                    game1: req.body.status.game1,
                    game2: req.body.status.game2,
                    game3: req.body.status.game3,
                }

            }, {runValidators: true},(err, author) =>{
            if (err){
                console.log("EDIT FAILED!");
                let message = {"message": "error occured"};
                for (var key in err.errors){
                    message[key] = err.errors[key].message;
                }
                res.json(message);
            }else{
                console.log("EDIT SUCCESS!");
                res.json(author);
            }
        });
    },

    addComment: (req, res) => {
        // console.log("players.js addComment: ", req.body);
        Player.findByIdAndUpdate(req.params.id, 
                {$push: {comments: req.body} },
                (err, author) =>{
            if (err){
                console.log("EDIT FAILED!");
                let message = {"message": "error occured"};
                for (var key in err.errors){
                    message[key] = err.errors[key].message;
                }
                res.json(message);
            }else{
                console.log("EDIT SUCCESS!");
                res.json(author);
            }
        });
    },

    deletePlayer: (req, res) =>{
        Player.findByIdAndDelete(req.params.id, (err, player) => {
            if (err){
                console.log("DELETE FAILED!");
                res.json(player);
            }else{
                res.json(player);
            }
        })
    },

}