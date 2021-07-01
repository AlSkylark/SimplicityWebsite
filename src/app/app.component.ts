import { HostBinding } from '@angular/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { slideInAnimation } from 'src/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  @HostBinding('@routeAnimations')
  title = 'simplicitywebsite';

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData;
  }
}
