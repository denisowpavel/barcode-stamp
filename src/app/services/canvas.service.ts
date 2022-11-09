import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  canvas?: ElementRef;
  ctx?: CanvasRenderingContext2D;

  constructor() {}

  public initCanvas(canvas?: ElementRef): void {
    console.log('INIT Canvas > ', canvas);
    if (!canvas) {
      return;
    }
    this.canvas = canvas;
    this.ctx = this.canvas?.nativeElement.getContext('2d');
  }

  public clearCanvas(): void {
    this.ctx?.clearRect(
      0,
      0,
      this.canvas?.nativeElement.width,
      this.canvas?.nativeElement.height
    );
  }

  public addBg(): void {
    if (!this.ctx){
      return;
    }
    const canvasRect = this.canvas?.nativeElement.getBoundingClientRect();
    const rectSize = 10;
    for (let i = 0; i < (canvasRect.height/rectSize); i++) {
      for (let j = 0; j < (canvasRect.width/rectSize); j++) {
        this.ctx.beginPath();
        this.ctx.fillStyle = ["#f3f3f3", "#ccc"][(i + j) % 2];
        this.ctx.fillRect(j * rectSize, i * rectSize, rectSize, rectSize);
        this.ctx.closePath();
      }
    }
  }

  public addImage(image?: HTMLImageElement): void {
    if (!image) {
      return;
    }
    const canvasRect = this.canvas?.nativeElement.getBoundingClientRect();
    this.ctx?.drawImage(
      image,
      (canvasRect.width - image.width) / 2,
      (canvasRect.height - image.height) / 2
    );
  }
}
