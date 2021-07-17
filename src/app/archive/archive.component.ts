import { Component, OnInit } from '@angular/core';
import { archiveAnimations } from 'src/animations';
import { DatabaseService } from '../database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
  animations: [
    archiveAnimations.pcontainerAnim,
    archiveAnimations.chapterAnim
  ]
})
export class ArchiveComponent implements OnInit {

  public pagesVisible: boolean = false;
  public chpsVisible: Map<string, boolean> = new Map();
  public chapters: Observable<any>;
  public pages: Observable<any>;

  constructor(private db: DatabaseService) {
    this.chapters = this.db.getChapters();
    this.chapters.subscribe((val: Array<any>[]) =>{
      val.forEach(el => {
        this.chpsVisible.set(el['name'], false);  
      });
      console.log(this.chpsVisible);
    })
    this.pages = this.db.getAllUpdates();
   }

  ngOnInit(): void {
  }

  chapterClick(name: string){
    this.chpsVisible.get(name) ? this.chpsVisible.set(name, false) : this.chpsVisible.set(name, true);
    // this.pagesVisible ? this.pagesVisible = false : this.pagesVisible = true;
  }

}
