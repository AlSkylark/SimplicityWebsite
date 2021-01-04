import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject, Observable } from 'rxjs';
import { pluck, flatMap, map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  private listPages: Observable<any>;
  private navbarEvent = new Subject<any>();
  private noPages: number;
  constructor(private db: AngularFireDatabase) {
    
   }

   sendNavbarEvent(latest: boolean){
     this.navbarEvent.next(latest);
   }

   getNavbarEvent(){
     return this.navbarEvent.asObservable();
   }

  getLast(){
    this.listPages = this.db.list('/updates', ref => ref.orderByChild('id').limitToLast(2)).valueChanges();
    return this.listPages;
  }

  getFirst(){
    this.listPages = this.db.list('/updates', ref => ref.orderByChild('id').limitToFirst(2)).valueChanges();
    return this.listPages;
  }

  getComics(page: number){
    this.listPages = this.db.list('/updates', ref => ref.orderByChild('id').startAt(page - 1).limitToFirst(3)).valueChanges();
    return this.listPages;
  };

  getSingle(page: number){
    this.listPages = this.db.list('/updates', ref => ref.orderByChild('id').equalTo(page)).valueChanges();
    return this.listPages;
  };

  getPages(){
    this.listPages = this.db.list('/updates', ref => ref.orderByChild('id').limitToLast(1)).valueChanges();
    return this.listPages
  };
}
