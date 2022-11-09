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

    this.canvas.nativeElement.onmousedown = this.drag;
    this.canvas.nativeElement.ontouchstart = this.drag;
    this.canvas.nativeElement.onmouseup = this.drop;
    this.canvas.nativeElement.ontouchmove = this.move;
    this.canvas.nativeElement.ontouchend = this.drop;
    this.canvas.nativeElement.ontouchcancel = this.drop;
    this.canvas.nativeElement.onmousemove = this.move;
  }
  private drag(e: any) {
    //console.log('drag', e);
  }
  private drop(e: any) {
    //console.log('drop', e);
  }
  private move(e: any) {
    //console.log('move', e);
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
    if (!this.ctx) {
      return;
    }
    const canvasRect = this.canvas?.nativeElement.getBoundingClientRect();
    const rectSize = 10;
    for (let i = 0; i < canvasRect.height / rectSize; i++) {
      for (let j = 0; j < canvasRect.width / rectSize; j++) {
        this.ctx.beginPath();
        this.ctx.fillStyle = ['#f3f3f3', '#ccc'][(i + j) % 2];
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

  public renderMainScene(
    docImage?: HTMLImageElement,
    barCodeImage?: HTMLImageElement
  ): void {
    this.clearCanvas();
    this.addBg();
    //const canvasRect = this.canvas?.nativeElement.getBoundingClientRect();
    if (docImage) {
      this.ctx?.drawImage(docImage, 0, 0);
    }
    if (barCodeImage) {
      this.ctx?.drawImage(barCodeImage, 0, 0);
    }
  }
}
