import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComicComponent } from './main-comic/main-comic.component';
import { LoadingComponent } from './loading/loading.component';
import { LogsComponent } from './logs/logs.component';
import { ArchiveComponent } from './archive/archive.component';

export const routingComponents = [MainComicComponent, LoadingComponent, LogsComponent, ArchiveComponent]

const routes: Routes = [
  {path:'', redirectTo:'1', pathMatch: 'full'},
  {path:'loading', component: routingComponents[1]},
  {path:'logs', component: routingComponents[2]},
  {path:'archive', component: routingComponents[3]},
  {path:':pageNumber', component: routingComponents[0]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
