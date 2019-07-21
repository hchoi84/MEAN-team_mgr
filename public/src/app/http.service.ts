import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // dependency injection

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }

  // Create Player
  createPlayer(player){ return this._http.post("/players", player); }
  // Read Player
  getPlayers(){ return this._http.get("/players"); }
  getPlayer(id){ return this._http.get(`/players/${id}`); }
  // Update Player
  updatePlayer(player){ return this._http.put(`/players/${player._id}`, player); }
  addComment(player, comment){ return this._http.put(`/players/addcomment/${player._id}`, comment); }
  // Delete Player
  deletePlayer(id){ return this._http.delete(`/players/${id}`); }

  // Create Comment
  createComment(comment){ return this._http.post("/comments", comment); }
  // Read Comment
  getComments(playerId){ return this._http.get(`/comments/${playerId}`)}
  // Update Comment
  addLike(comment){ return this._http.put(`/comments/like/${comment._id}`, comment); }
  addDislike(comment){ return this._http.put(`/comments/dislike/${comment._id}`, comment); }
  // Delete Comment
  deleteComment(id){ return this._http.delete(`/comments/delete/${id}`); }
}
