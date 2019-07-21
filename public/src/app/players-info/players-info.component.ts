import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-players-info',
  templateUrl: './players-info.component.html',
  styleUrls: ['../app.component.css', './players-info.component.css']
})
export class PlayersInfoComponent implements OnInit {

  private comment: any = {
    name: "",
    subject: "",
    content: ""
  }
  private playerId: any;
  private player: any;
  private comments: any;
  private game1: string;
  private game2: string;
  private game3: string;
  private startedDate: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _titleService: Title,
  ) {}

  ngOnInit() {
    this._titleService.setTitle("info");
    this._route.params.subscribe((params: Params) => this.playerId = params.id);
    let observable = this._httpService.getPlayer(this.playerId);
    observable.subscribe( data => {
      this.player = data;
      this.game1 = this.player.status.game1 === "p" ? "Playing" : this.player.status.game1 === "np" ? "Not Playing" : "Undecided";
      this.game2 = this.player.status.game2 === "p" ? "Playing" : this.player.status.game2 === "np" ? "Not Playing" : "Undecided";
      this.game3 = this.player.status.game3 === "p" ? "Playing" : this.player.status.game3 === "np" ? "Not Playing" : "Undecided";
    });
    this._httpService.getComments(this.playerId).subscribe( data => {
      this.comments = data;
    });
  }

  submitComment(){
    this.comment['playerId'] = this.playerId;
    let observable = this._httpService.createComment(this.comment);
    observable.subscribe( data => {
      this.comment = {name: "", subject: "", content: ""};
      this.ngOnInit();
    });
  }

  getDateDiff(date){
    let minutes = moment().diff(date, "minutes");
    if (minutes < 60){
      return minutes > 1 ? (minutes + " minutes") : (minutes + " minute");
    }
    let hours = moment().diff(date, "hours");
    if (hours < 24){
      return hours > 1 ? (hours + " hours") : (hours + " hour");
    }
    let days = moment().diff(date, "days");
    if (days < 30){
      return days > 1 ? (days + " days") : (days + " day");
    }
    let months = moment().diff(date, "months");
    if (months < 12 ){
      return months > 1 ? (months + " months") : (months + " month");
    }
    let years = moment().diff(date, "years");
    return years > 1 ? (years + " years") : (years + " year");
  }

  addLike(comment){
    let observable = this._httpService.addLike(comment);
    observable.subscribe( data => {
      this.ngOnInit();
    })
  }

  addDislike(comment){
    let observable = this._httpService.addDislike(comment);
    observable.subscribe( data => {
      this.ngOnInit();
    })
  }

  deleteComment(id){
    let observable = this._httpService.deleteComment(id);
    observable.subscribe( data => {
      this.ngOnInit();
    })
  }
}
