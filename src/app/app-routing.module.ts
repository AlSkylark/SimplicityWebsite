import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminActivateGuard } from './adminactivate.guard';
import { LoginComponent } from './login/login.component';
import { MainComicComponent } from './main-comic/main-comic.component';
import { LoadingComponent } from './loading/loading.component';
import { LogsComponent } from './logs/logs.component';

export const routingComponents = [MainComicComponent, LoginComponent, LoadingComponent, LogsComponent]

const routes: Routes = [
  {path:'', redirectTo:'1', pathMatch: 'full'},
  {path:'admin', component:routingComponents[1]},
  {path:'loading', component: routingComponents[2]},
  {path:'logs', component: routingComponents[3]},
  {path:':pageNumber', component: routingComponents[0]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
