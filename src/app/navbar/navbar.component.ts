import { Component, OnInit } from '@angular/core';
import { navAnimations } from 'src/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    navAnimations.bar1Anim,
    navAnimations.bar2Anim,
    navAnimations.bar3Anim,
    navAnimations.menuAnim
  ]
})
export class NavbarComponent implements OnInit {
  public navHide: boolean = false;
  constructor( ) {

   }
  ngOnInit(): void {
    
  }
  toggleNav(){
    this.navHide ? this.navHide = false : this.navHide = true;
  }

}
