import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
// import { PlayersAddComponent } from '../players-add/players-add.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['../app.component.css', './players.component.css']
})
export class PlayersComponent implements OnInit {
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _titleService: Title,
    ) {}
    
  // private playerAdd: PlayersAddComponent;
    
  ngOnInit() {
    this._titleService.setTitle("players");
    this._router.navigate(['/players','list']);
  }

  // test(){ // for testing only
  //   this.playerAdd.createPlayer();
  // }
}
