import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['../app.component.css', './players-list.component.css']
})

export class PlayersListComponent implements OnInit {
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _titleService: Title,
  ) {}

  private allPlayers: any;
  private today: any = moment().toISOString();
  private nameAsc: boolean = false;
  private dateDesc: boolean = false;
  private searchName: string;
  

  ngOnInit() {
    this._titleService.setTitle("list");
    let observable = this._httpService.getPlayers();
    observable.subscribe(data => {
      this.allPlayers = data;
      // for (let x in this.allPlayers){
      //   let newDateTime = new Date(this.allPlayers[x].createdAt);
      //   this.allPlayers[x]["local"] = newDateTime;
      // }
      // console.log(this.allPlayers);
    });
  }

  deletePlayer(id){
    // Specifically entering DELETE instead of just choosing OK or CANCEL
    // let confirmation = prompt("Please enter DELETE to confirm");
    // if (confirmation == "DELETE"){
    //   let observable = this._httpService.deletePlayer(id);
    //   observable.subscribe(data => {
    //     this.ngOnInit();
    //   });
    // }
    let confirmation = confirm("Are you sure?");
    if (confirmation){
      let observable = this._httpService.deletePlayer(id);
      observable.subscribe(data => {
        // this.allPlayers = data;
      });
      let temp = this.allPlayers.filter( player => player._id != id );
      this.allPlayers = temp;
      // PROB: when multiple people are deleting at the same time since this doesn't pull back from DB
    }
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

  sortAtoZ(){
    if (!this.nameAsc){
      let sortedPlayers: any;
      sortedPlayers = this.allPlayers.slice(0);
      sortedPlayers.sort((a,b) => {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
      // console.log("sorted players: ", sortedPlayers);
      this.allPlayers = sortedPlayers;
      this.nameAsc = true;
    }else{
      let sortedPlayers: any;
      sortedPlayers = this.allPlayers.slice(0);
      sortedPlayers.sort((a,b) => {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x > y ? -1 : x < y ? 1 : 0;
      });
      // console.log("sorted players: ", sortedPlayers);
      this.allPlayers = sortedPlayers;
      this.nameAsc = false;
    }
  }

  sortDate(){
    console.log("Sorting by date");
    if (this.dateDesc){
      let sortedDate: any;
      sortedDate = this.allPlayers.slice(0);
      sortedDate.sort((a,b) => {
        var x = a.createdAt;
        var y = b.createdAt;
        return x < y ? -1 : x > y ? 1 : 0;
      });
      this.allPlayers = sortedDate;
      this.dateDesc = false;
    }else{
      let sortedDate: any;
      sortedDate = this.allPlayers.slice(0);
      sortedDate.sort((a,b) => {
        var x = a.createdAt;
        var y = b.createdAt;
        return x > y ? -1 : x < y ? 1 : 0;
      });
      this.allPlayers = sortedDate;
      this.dateDesc = true;
    }
  }
  
  Search(){
    // PROB: sorting, searching, then deleting search input will cause sort to be undone
    if (this.searchName != ""){
      this.allPlayers = this.allPlayers.filter(res =>{
        return res.name.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
      });
    }else{
      this.ngOnInit();
    }
  }
}
