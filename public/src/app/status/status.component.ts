import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['../app.component.css', './status.component.css']
})
export class StatusComponent implements OnInit {
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _titleService: Title,
  ) {}

  private allPlayers: any;
  private gameId: number;
  private gameKey: string;
  
  ngOnInit() {
    this._titleService.setTitle("status");
    // this._route.params.subscribe((params: Params) => this.gameId = params.id);
    this.gameId = 1;
    this.gameKey = "game" + this.gameId;
    // console.log("Here's the ID: ", this.gameId);
    let observable = this._httpService.getPlayers();
    observable.subscribe(data => {
      this.allPlayers = data;
    })
  }

  updateAction(player, act){
    player.status[this.gameKey] = act;
    let observable = this._httpService.updatePlayer(player);
    observable.subscribe(data => {
      // this.ngOnInit();
    })
  }

  game(id){
    this.gameId = id;
    this._router.navigate(["/status", "game", id]);
    this.gameKey = "game" + this.gameId;
    // this.ngOnInit();
  }

}
