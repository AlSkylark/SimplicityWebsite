import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import {  AnimationEvent } from '@angular/animations';
import { Animations } from 'src/animations';
import { DatabaseService } from 'src/app/database.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router'
import { ComicPage } from 'src/app/comic-page';

@Component({
  selector: 'app-main-comic',
  templateUrl: './main-comic.component.html',
  styleUrls: ['./main-comic.component.css'],
  animations:[
    Animations.centerAnim,
    Animations.otherAnim
  ]
})


export class MainComicComponent implements OnInit{

  
  @ViewChildren('pageDropdown') dropdown: QueryList<any>;
  public imgBool: boolean = true;

  private currentPage: string;
  private noPages: number;

  public leftVisible: boolean = true;
  public rightVisible: boolean = true;
  public animDir: boolean;

  public centerFront: string = "c";
  public otherLoad: string = "";
  
  public comicMain = new ComicPage();


  public pageList: Observable<any>;
  private pageQueried: Observable<any>;
  
  public pag: number[] = [];

  constructor(private db: DatabaseService, private router: Router, private route: ActivatedRoute) 
  { 
    
    //observer for the routing/comic page
    this.route.params.subscribe((pN: Params) => {
      this.currentPage = pN['pageNumber'];
      if(pN['pageNumber'] == 'latest') { 
        this.loadLast(); 
      } else { 
        this.mainComic(+this.currentPage);
      };
    })
    
    //get total page number then push em to page array
    this.pageList = this.db.getLast();
    this.pageList.subscribe(val => 
      {
        this.noPages = val[0]['id'];
        this.pag = [];
        for(let i = 1; i < val[0]['id'] + 1; i++) 
        { 
          this.pag.push(i);
        }
      });
  }

  

  ngOnInit(): void {
    
    
  }

  /**
   * Main function, queries the database and shows whichever comic into the main view.
   * @param page The page to query/show.
   */
  mainComic(page: number){
    this.pageQueried = this.db.getPage(page);
    this.pageQueried.subscribe(comic => {
      
      //we show the loading whilst img loads
      this.imgBool = false;
      
      //attach the data to the comicmain
      this.comicMain = new ComicPage(comic[0]['imgurl'],comic[0]['id'],comic[0]['caption'],[comic][0]['alt']);
      console.log(this.comicMain);
      
      
      //update arrows
      this.arrowCheck();
    })
  }

  imgLoad(){
    this.imgBool = true;
  }

  loadLast(){
    this.router.navigate(['', this.noPages]);
  }

  loadFirst(){
    this.router.navigate(["/", 1]);
  }
  
  loadSpecific(page: string)
  {
    this.router.navigate(["/", page]);
  }

  loadNext(){
    if(this.comicMain.id == this.noPages) return;
    this.router.navigate(["/", this.comicMain.id + 1]);
  }
  loadPrev(){
    if(this.comicMain.id == 1) return;
    this.router.navigate(["/", this.comicMain.id - 1]);
  }

  switchComic(isLeft: boolean, isDropdown?: boolean){
    if(isLeft == true) 
    {
      this.centerFront = "l"
      setTimeout(() => {this.centerFront = 'c'},650);
      this.animDir = true;
      //this.loadPrev();
    } 
    else 
    {
      this.centerFront = "r";
      setTimeout(() => {this.centerFront = 'c'},650);
      this.animDir = false;
      //this.loadNext();
    }
  }

  onAnimationEnd(e: AnimationEvent)
  {
    if(e.toState == 'c' && e.fromState != 'void') {this.animDir ? this.loadPrev() : this.loadNext();}  
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
