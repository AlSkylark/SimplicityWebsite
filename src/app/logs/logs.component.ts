import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  public logList: Observable<any>;
  public visible: boolean[] = [];
  public reading: boolean = false;

  constructor(private db: DatabaseService) {
    this.logList = this.db.getLogs();
    this.logList.subscribe(val => {
      val.forEach(e => {
        this.visible.push(false);
      });
    });
   }

  ngOnInit(): void {
  }

  loadLog( logNum ){
    if (this.visible[logNum - 1]) {
      this.visible[logNum - 1] = false;
      this.reading = false;
    } else { 
      this.visible[logNum - 1] = true
      this.reading = true;
    }
     
    // if(e.type == 'mouseenter') {this.dot = true} else {this.dot = false}
  }

}
