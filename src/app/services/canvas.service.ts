import { ElementRef, Injectable } from '@angular/core';
import { IGraphicObject } from '@interfaces/graphic-object';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  canvas?: ElementRef;
  ctx?: CanvasRenderingContext2D;
  height: number = 0;
  width: number = 0;
  barCode: IGraphicObject | null = null;
  isDragging = false;
  cacheDocImage?: HTMLImageElement;
  cacheBarCodeImage?: HTMLImageElement;

  constructor() {}

  public initCanvas(canvas?: ElementRef): void {
    console.log('INIT Canvas > ', canvas);
    if (!canvas) {
      return;
    }
    this.canvas = canvas;
    this.ctx = this.canvas?.nativeElement.getContext('2d');

    this.canvas.nativeElement.onmousedown = this.drag.bind(this);
    this.canvas.nativeElement.ontouchstart = this.drag.bind(this);
    this.canvas.nativeElement.onmouseup = this.drop.bind(this);
    this.canvas.nativeElement.ontouchmove = this.move.bind(this);
    this.canvas.nativeElement.ontouchend = this.drop.bind(this);
    this.canvas.nativeElement.ontouchcancel = this.drop.bind(this);
    this.canvas.nativeElement.onmousemove = this.move.bind(this);
  }

  private drag(e: any) {
    if (this.isHoverObject(this.barCode, e.clientX, e.clientY)) {
      this.isDragging = true;
      this.setCursor();
    }
  }

  private drop(e: TouchEvent | MouseEvent) {
    this.isDragging = false;
    this.setCursor();
  }

  private move(e: any) {
    console.log(e)
    e.preventDefault();
    this.setCursor(
      this.isHoverObject(this.barCode, e.clientX, e.clientY)
        ? 'grab'
        : 'default'
    );
    if (this.isDragging && this.barCode) {
      this.barCode.top += e.movementY;
      this.barCode.left += e.movementX;
      this.renderMainScene(this.cacheDocImage, this.cacheBarCodeImage)
    }
  }
  public setCursor(cursor = 'default') {
    if (this.isDragging) {
      cursor = 'grabbing';
    }
    document.body.style.cursor = cursor;
  }

  private isHoverObject(
    obj: IGraphicObject | null,
    x: number,
    y: number
  ): boolean {
    if (!obj) {
      return false;
    }
    return (
      x > obj.left &&
      x < obj.left + obj.width &&
      y > obj.top &&
      y < obj.top + obj.height
    );
  }
  public updateSelfSize(): void {
    const canvasRect = this.canvas?.nativeElement.getBoundingClientRect();
    if (!canvasRect) {
      return;
    }
    this.height = canvasRect.height;
    this.width = canvasRect.width;
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
    const rectSize = 10;
    this.updateSelfSize();
    for (let i = 0; i < this.height / rectSize; i++) {
      for (let j = 0; j < this.width / rectSize; j++) {
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
    this.updateSelfSize();
    this.ctx?.drawImage(
      image,
      (this.width - image.width) / 2,
      (this.height - image.height) / 2
    );
  }

  public renderMainScene(
    docImage?: HTMLImageElement,
    barCodeImage?: HTMLImageElement
  ): void {
    this.clearCanvas();
    this.addBg();
    if (docImage) {
      this.ctx?.drawImage(docImage, 0, 0);
      this.cacheDocImage = docImage;
    }
    if (barCodeImage) {
      this.barCode = {
        top: this.barCode
          ? this.barCode.top
          : (this.height - barCodeImage.height) / 2,
        left: this.barCode
          ? this.barCode.left
          : (this.width - barCodeImage.width) / 2,
        height: barCodeImage.height,
        width: barCodeImage.width,
      };
      this.ctx?.drawImage(barCodeImage, this.barCode.left, this.barCode.top);
      this.cacheBarCodeImage = barCodeImage;
    }
  }
}
