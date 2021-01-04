import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef<HTMLCanvasElement>;
    private inCanvas = false;
    public inX: number;
    public inY: number;

  constructor() { }

  ngOnInit(): void {

  }

  someFunc(){
    const ctx = this.myCanvas.nativeElement.getContext('2d');
    ctx.fillStyle ='rgb(200,0,0)';
    ctx.fillRect(200, 200, 100, 100);
  }
  
  onClick(e: MouseEvent){
    this.inCanvas = true;
    this.inX = e.clientX - this.myCanvas.nativeElement.getBoundingClientRect().left;
    this.inY = e.clientY - this.myCanvas.nativeElement.getBoundingClientRect().top;
  }
  onOut(e: MouseEvent){
    this.inCanvas = false;
    
  }

  onMove(e: MouseEvent){
    if(this.inCanvas) 
    {
      const canvas = this.myCanvas.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const ctx =  canvas.getContext('2d');
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      ctx.strokeStyle = 'rgb(100,30,20)';
      ctx.clearRect(0,0, canvas.width, canvas.height);
      //ctx.beginPath();
      //ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.setLineDash([4,2]);
      if(x > this.inX && y > this.inY){
        ctx.strokeRect(this.inX, this.inY, y - this.inY, y - this.inY);
      } else if(x < this.inX && y < this.inY){
        ctx.strokeRect(this.inX, this.inY, x - this.inY, x - this.inY);
      } else if (x > this.inX && y < this.inY) { 
        ctx.strokeRect(this.inX, this.inY, x - this.inX, -(x - this.inX));
      } else {
        ctx.strokeRect(this.inX, this.inY, -(y - this.inY), y - this.inY);
      }
      //ctx.strokeRect(this.inX, this.inY, x - this.inX, x - this.inX);
      // ctx.lineWidth = 2;
      // ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      // ctx.stroke();

      // ctx.strokeStyle = 'rgb(200,30,20)'
      // ctx.lineTo((e.clientX - rect.left)+3, (e.clientY-rect.left) +3);
      // ctx.stroke();
      
      // ctx.clearRect(e.clientX - rect.left, e.clientY - rect.top, 2,2);
    }
  }
}
