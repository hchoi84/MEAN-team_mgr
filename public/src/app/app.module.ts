import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PlayersComponent } from './players/players.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayersAddComponent } from './players-add/players-add.component';
import { StatusComponent } from './status/status.component';
import { PlayersInfoComponent } from './players-info/players-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayersListComponent,
    PlayersAddComponent,
    StatusComponent,
    PlayersInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
