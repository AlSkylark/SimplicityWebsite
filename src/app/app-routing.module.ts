import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminActivateGuard } from './adminactivate.guard';
import { LoginComponent } from './login/login.component';
import { MainComicComponent } from './main-comic/main-comic.component';
import { LoadingComponent } from './loading/loading.component';
import { CanvasComponent } from './canvas/canvas.component';

export const routingComponents = [MainComicComponent,AdminPanelComponent, LoginComponent, LoadingComponent, CanvasComponent]

const routes: Routes = [
  {path:'', redirectTo:'1', pathMatch: 'full'},
  {path:'admin-panel', component: routingComponents[1]},
  {path:'admin', component:routingComponents[2]},
  {path:'loading', component: routingComponents[3]},
  {path:'canvas', component: routingComponents[4]},
  {path:':pageNumber', component: routingComponents[0]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
