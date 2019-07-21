import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-players-add',
  templateUrl: './players-add.component.html',
  styleUrls: ['../app.component.css', './players-add.component.css']
})
export class PlayersAddComponent implements OnInit {
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _titleService: Title,
  ) {}

  private player: any;
  private message: any;

  ngOnInit() {
    this._titleService.setTitle("add");
    this.player = {
      name: "",
      pos: "",
    }
  }

  createPlayer(){
    let observable = this._httpService.createPlayer(this.player)
    observable.subscribe((data: any) => {
      if (data.message){
        this.message = data;
      }else{
        this._router.navigate(['/players','list']);
      }
    });
  }

}
