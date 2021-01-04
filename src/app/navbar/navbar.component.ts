import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private clicks: DatabaseService ) {

   }
  ngOnInit(): void {
    
  }

  last(){
    this.clicks.sendNavbarEvent(true);
  }

  start(){
    this.clicks.sendNavbarEvent(false);
  }
}
