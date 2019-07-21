import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from './players/players.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayersAddComponent } from './players-add/players-add.component';
import { StatusComponent } from './status/status.component';
import { PlayersInfoComponent } from './players-info/players-info.component';


const routes: Routes = [
  { path: "players", component: PlayersComponent, children: [
    { path: "list", component: PlayersListComponent },
    { path: "add", component: PlayersAddComponent },
    { path: ":id", component: PlayersInfoComponent },
  ]},
  { path: "status", component: StatusComponent, children: [
    { path: "game/:id", component: StatusComponent}
  ]},
  { path: "", pathMatch: 'full', redirectTo: '/players/list'},
  { path: '**', component: PlayersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
