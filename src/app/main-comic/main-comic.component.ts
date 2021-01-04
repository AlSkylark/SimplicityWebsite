import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import {  AnimationEvent } from '@angular/animations';
import { Animations } from 'src/animations';
import { DatabaseService } from 'src/app/database.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComicPage } from 'src/app/comic-page';

@Component({
  selector: 'app-main-comic',
  templateUrl: './main-comic.component.html',
  styleUrls: ['./main-comic.component.css'],
  animations:[
    Animations.leftAnim,
    Animations.centerAnim,
    Animations.rightAnim
  ]
})


export class MainComicComponent implements OnInit, AfterViewInit {

  
  @ViewChildren('pageDropdown') dropdown: QueryList<any>;
  public $isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public imgBool: boolean = true;

  private select: HTMLInputElement;
  private currentPage: number;
  private noPages: number;

  public leftVisible: boolean = true;
  public rightVisible: boolean = true;

  public leftFront: boolean = false;
  public centerFront: string = "c";
  public rightFront: boolean = false;
  

  public comicLeft = new ComicPage();
  public comicMain = new ComicPage();
  public comicRight = new ComicPage();

  public pageList: Observable<any>;
  private pages: Observable<any>;
  
  public pag: number[] = [];
  
  private navbarSubscriber: Subscription;

  constructor(private db: DatabaseService, private cdref: ChangeDetectorRef) 
  { 
    //set the subscription to navbar click events
    this.navbarSubscriber = this.db.getNavbarEvent().subscribe(latest =>
      {
        //if latest is clicked or start is clicked
        if(latest == true){ this.loadLast() }else{ this.loadFirst() }
      });
    
    //get total page number then push em to page array
    this.pageList = this.db.getPages();
    this.pageList.subscribe(val => 
      {
        this.noPages = val[0]['id'];
        this.pag = [];
        for(let i = 1; i < val[0]['id'] + 1; i++) 
        { 
          this.pag.push(i);
        }
      });
    //get last on first page load
    this.pages = this.db.getLast();
  }

  

  ngOnInit(): void {
    this.loadLast();
  }

  ngAfterViewInit() {
    this.dropdown.changes.subscribe(() => 
    { 
      this.select = (<HTMLInputElement>document.getElementById('selectDropdown'));
      this.select.value = this.comicMain.id.toString();
      this.currentPage = this.comicMain.id;
    });
  }
  
  imgLoad(){
    this.$isLoading.next(false);
  }

  loadLast(){
    this.pages.subscribe(val =>{
      //load left
      this.comicLeft.changePage(val[0]['imgurl'], val[0]['id'], val[0]['caption']);
      //load main
      this.comicMain.changePage(val[1]['imgurl'], val[1]['id'], val[1]['caption']);
      if (this.select) this.select.value = this.comicMain.id.toString();
      this.toggleArrows(1);
    });
  }

  loadFirst(){
    const first = this.db.getFirst();
    first.subscribe(val =>{
      //load Right
      this.comicRight.changePage(val[1]['imgurl'], val[1]['id'], val[1]['caption']);
      //load main
      this.comicMain.changePage(val[0]['imgurl'], val[0]['id'], val[0]['caption']);
      if (this.select) this.select.value = this.comicMain.id.toString();
      this.arrowCheck();
    });
  }
  
  loadSpecific(page: string)
  {
    setTimeout(()=>
    {
      this.$isLoading.next(true);
      this.imgBool = false;
      switch(page)
      {
        case '1':
          this.loadFirst(); 
        break;
        case this.noPages.toString():
          this.loadLast();
        break;
        default:
          const chosenPage = this.db.getComics(parseInt(page));
          chosenPage.subscribe(val =>{
            this.comicLeft.changePage(val[0]['imgurl'],val[0]['id'],val[0]['caption']);
            this.comicMain.changePage(val[1]['imgurl'],val[1]['id'],val[1]['caption']);;
            this.$isLoading.next(false);
            this.imgBool = true;
            this.comicRight.changePage(val[2]['imgurl'],val[2]['id'],val[2]['caption']);;
            this.arrowCheck();
          });
        break;
      }
    }, 500);
    if (this.currentPage < parseInt(page)) {
      this.switchComic(false, true); 
    } else {
      this.switchComic(true, true); 
    }
    this.currentPage = parseInt(page);
    
  }


  onAnimationEnd( e: AnimationEvent )
  {
    
    switch(e.triggerName) {

      case 'leftAnim':
        if (e.fromState.toString() == 'false'){
          // i need to copy the imgleftsrc to mainsrc
          this.comicRight.changePage(this.comicMain);
          this.comicMain.changePage(this.comicLeft);
          this.switchComic(true);
          this.select.value = this.comicMain.id.toString();
          //TODO: Here we query the database again
          if(this.comicMain.id != this.noPages && this.comicMain.id != 1)
          {
            const prevPage = this.db.getSingle(this.comicMain.id-1);
            prevPage.subscribe(val => {
              this.comicLeft.changePage(val[0]['imgurl'],val[0]['id'],val[0]['caption']);
            });
          } else {
            this.loadFirst();
          }
          this.arrowCheck();
        }
        break;
      
      case 'rightAnim':
        if (e.fromState.toString() == 'false'){
          // i need to copy the imgleftsrc to mainsrc
          this.comicLeft.changePage(this.comicMain);
          this.comicMain.changePage(this.comicRight);
          this.switchComic(false);
          this.select.value = this.comicMain.id.toString();
          //TODO: Here we query the database again
          if(this.comicMain.id != this.noPages && this.comicMain.id != 1)
          {
            const nextPage = this.db.getSingle(this.comicMain.id + 1);
            nextPage.subscribe(val => {
              this.comicRight.changePage(val[0]['imgurl'],val[0]['id'],val[0]['caption']);
            });
          } else {
            this.loadLast();
          }
          this.arrowCheck();
        }
        break;
      
    }

  }

  switchComic(isLeft: boolean, isDropdown?: boolean){
    if(isLeft == true) {
      if(isDropdown) { 
        this.centerFront = "l"
        setTimeout(() => this.centerFront = "rl", 500)
        setTimeout(() => this.centerFront = "c", 500)
        return;}
      if(this.leftFront == true) 
      { 
        this.leftFront = false;
        this.centerFront = "c";
      } 
      else 
      {
        this.leftFront = true;
        this.centerFront = "l";
      }
      
    } else {
      if(isDropdown) { 
        this.centerFront = "r"
        setTimeout(() => this.centerFront = "lr", 500)
        setTimeout(() => this.centerFront = "c", 500)
        return;}
      if(this.rightFront == true) 
      { 
        this.rightFront = false;
        this.centerFront = "c";
      } 
      else 
      {
        this.rightFront = true;
        this.centerFront = "r";
      }
      
    }
  }

  /**
   * This toggles the arrows visible or invisible. 
   * 0 is Left, 1 is Right and 2 is Both.
   */
  toggleArrows(_0Left1Right2Both: number){
    switch(_0Left1Right2Both)
    {
      //left
      case 0:
        this.leftVisible = false;
        this.rightVisible = true;
      break;
      //right
      case 1:
        this.leftVisible = true;
        this.rightVisible = false;
      break;
      //both
      case 2:
        this.leftVisible = true;
        this.rightVisible = true;
      break;
    }
  }
  arrowCheck(){
    if(this.comicMain.id == this.noPages){
      this.toggleArrows(1);
    }else if(this.comicMain.id == 1){
      this.toggleArrows(0)
    } else {
      this.toggleArrows(2);
    }
  }
}
