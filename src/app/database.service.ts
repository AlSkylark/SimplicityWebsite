import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
/**
 * The DatabaseService is in charge to talk to the Firebase database and provides a series of 
 * useful methods to retrieve data.
 */
export class DatabaseService {
  
  private listPages: Observable<any>;
  private listLogs: Observable<any>;
  private listChapters: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    
   }
   /**
    * Returns all the logs in the database.
    * @returns {Observable<any>}
    */
   getLogs(): Observable<any> {
    this.listLogs = this.db.list('/logs', ref => ref.orderByChild('id')).valueChanges();
    return this.listLogs;
   }

   /**
    * Returns the last page uploaded to the database.
    * @returns {Observable<any>} 
    */
  getLast(): Observable<any> {
    this.listPages = this.db.list('/updates', ref => ref.orderByChild('id').limitToLast(1)).valueChanges();
    return this.listPages;
  }

  /**
   * Returns the first page uploaded to the database.
   * @returns {Observable<any>} 
   */
  getFirst(): Observable<any> {
    this.listPages = this.db.list('/updates', ref => ref.orderByChild('id').limitToFirst(1)).valueChanges();
    return this.listPages;
  }

  /**
   * Returns whichever page you pass in the argument. 
   * @param {number} page The page to return.
   * @returns {Observable<any>} 
   */
  getPage(page: number): Observable<any> {
    this.listPages = this.db.list('/updates', ref => ref.orderByChild('id').equalTo(page)).valueChanges();
    return this.listPages;
  };

  /**
   * Returns a list of chapters which contain the chapter name
   * and the length/number of pages.
   * @returns {Observable<any>}
   */
  getChapters(): Observable<any> {
    this.listChapters = this.db.list('/chapters').valueChanges();
    return this.listChapters;
  }
}
