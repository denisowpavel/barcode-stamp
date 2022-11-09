import { ElementRef, Injectable } from '@angular/core';
import { IGraphicObject } from '@interfaces/graphic-object';
import { MultiTouchService } from '@services/multi-touch.service';

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
  lastMTouchDist: number = 0;
  constructor(private multiTouchService: MultiTouchService) {}

  public initCanvas(canvas?: ElementRef): void {
    if (!canvas) {
      return;
    }
    this.canvas = canvas;
    this.ctx = this.canvas?.nativeElement.getContext('2d');

    this.canvas.nativeElement.onmousedown = this.drag.bind(this);
    this.canvas.nativeElement.onmouseup = this.drop.bind(this);
    this.canvas.nativeElement.onmousemove = this.move.bind(this);

    this.canvas.nativeElement.onwheel = this.wheel.bind(this);

    this.canvas.nativeElement.ontouchstart = this.touchStart.bind(this);
    this.canvas.nativeElement.ontouchmove = this.touch.bind(this);
    this.canvas.nativeElement.ontouchend = this.touchEnd.bind(this);
    this.canvas.nativeElement.ontouchcancel = this.touchEnd.bind(this);
  }

  private drag(e: any) {
    if (this.isHoverObject(this.barCode, e.clientX, e.clientY)) {
      this.isDragging = true;
      this.setCursor();
    }
  }

  private drop() {
    this.isDragging = false;
    this.setCursor();
  }

  private touchStart(e: any) {
    if (this.multiTouchService.setStart(e)) {
      this.singleTouch(e);
    }
  }
  private touchEnd() {
    this.lastMTouchDist = 0;
  }

  private touch(e: any) {
    if (this.multiTouchService.setMove(e)) {
      this.singleTouch(e);
    } else {
      this.multiTouch();
    }
  }

  private multiTouch() {
    if (this.barCode) {
      const dist = this.multiTouchService.getDistance();
      if (!this.lastMTouchDist) {
        this.lastMTouchDist = dist;
      }
      this.barCode.scale = dist / this.lastMTouchDist;
      this.barCode.rotation = this.multiTouchService.getRotation();
      this.renderMainScene(this.cacheDocImage, this.cacheBarCodeImage);
      this.lastMTouchDist = dist;
    }
  }

  private singleTouch(e: any) {
    if (this.barCode) {
      this.barCode.top = e.touches[0].clientY;
      this.barCode.left = e.touches[0].clientX;
      this.renderMainScene(this.cacheDocImage, this.cacheBarCodeImage);
    }
  }

  private move(e: any) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    this.setCursor(
      this.isHoverObject(this.barCode, e.clientX, e.clientY)
        ? 'grab'
        : 'default'
    );
    if (this.isDragging && this.barCode) {
      this.barCode.top += e.movementY;
      this.barCode.left += e.movementX;
      this.renderMainScene(this.cacheDocImage, this.cacheBarCodeImage);
    }
  }

  private wheel(e: any) {
    if (!this.barCode) {
      return;
    }
    if (!e.shiftKey) {
      this.barCode.scale += e.wheelDelta / 2000;
    } else {
      this.barCode.rotation += e.wheelDelta / 2000;
    }
    this.renderMainScene(this.cacheDocImage, this.cacheBarCodeImage);
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
    if (obj.rotation !== 0) {
      return true;
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
        height: barCodeImage.height * (this.barCode ? this.barCode.scale : 1),
        width: barCodeImage.width * (this.barCode ? this.barCode.scale : 1),
        scale: this.barCode ? this.barCode.scale : 1,
        rotation: this.barCode ? this.barCode.rotation : 0,
      };
      this.ctx?.translate(
        this.barCode.left - this.barCode.width / 2,
        this.barCode.top - this.barCode.height / 2
      );
      this.ctx?.rotate(this.barCode.rotation);
      this.ctx?.drawImage(
        barCodeImage,
        0,
        0,
        this.barCode.width,
        this.barCode.height
      );
      this.ctx?.rotate(-1 * this.barCode.rotation);
      this.ctx?.translate(
        -1 * (this.barCode.left - this.barCode.width / 2),
        -1 * (this.barCode.top - this.barCode.height / 2)
      );
      this.cacheBarCodeImage = barCodeImage;
    }
  }
}
