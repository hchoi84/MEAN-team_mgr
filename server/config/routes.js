const player = require("../controllers/players.js");
const comment = require("../controllers/comments.js");

module.exports = app => {
    app.get("/players", (req, res) => { player.getPlayers(req, res); })
    // PROBLEM: Why does below code get triggered when refrehsing /players/list??? WTF!!
    app.get("/players/:id", (req, res) => { player.getPlayer(req, res); })
    app.post("/players", (req, res) => { player.create(req, res); })
    app.put("/players/:id", (req, res) => { player.editPlayer(req, res); })
    app.put("/players/addcomment/:id", (req, res) => { player.addComment(req, res); })
    app.delete("/players/:id", (req, res) => { player.deletePlayer(req, res); })

    app.post("/comments", (req, res) => { comment.create(req, res); })
    app.get("/comments/:pid", (req, res) => { comment.getComments(req, res); })
    app.put("/comments/like/:id", (req, res) => { comment.addLike(req, res); })
    app.put("/comments/dislike/:id", (req, res) => { comment.addDislike(req, res); })
    app.delete("/comments/delete/:id", (req, res) => { comment.delete(req, res); })
}