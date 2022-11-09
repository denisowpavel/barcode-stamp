import { Injectable } from '@angular/core';
import { ITouchPoint, ITouchSet } from '@interfaces/touch';

@Injectable({
  providedIn: 'root',
})
export class MultiTouchService {
  touchSet: ITouchSet = {};
  constructor() {}

  public setStart(e: TouchEvent): boolean {
    this.touchSet.start = this.getPointsFromEvent(e);
    return this.touchSet.start.length === 1; // is single touch
  }

  public setMove(e: TouchEvent): boolean {
    this.touchSet.move = this.getPointsFromEvent(e);
    return this.touchSet.move.length === 1; // is single touch
  }

  // Get the distance between two fingers
  public getDistance(): number {
    if (!this.touchSet.move) {
      return 0;
    }
    if (this.touchSet.move.length === 2) {
      return Math.sqrt(
        Math.pow(this.touchSet.move[1].x - this.touchSet.move[0].x, 2) +
          Math.pow(this.touchSet.move[1].y - this.touchSet.move[0].y, 2)
      );
    } else {
      return 0;
    }
  }

  // Get the angle of rotation made by two fingers
  public getRotation() {
    if (!this.touchSet.start || !this.touchSet.move) {
      return 0;
    }
    if (this.touchSet.start.length == 2 && this.touchSet.move.length == 2) {
      let x, y;

      x = this.touchSet.start[0].x - this.touchSet.start[1].x;
      y = this.touchSet.start[0].y - this.touchSet.start[1].y;
      let start_rotation = Math.atan2(y, x);

      x = this.touchSet.move[0].x - this.touchSet.move[1].x;
      y = this.touchSet.move[0].y - this.touchSet.move[1].y;
      let end_rotation = Math.atan2(y, x);

      return end_rotation - start_rotation;
    }
    return 0;
  }

  //get the x and y positions from the event object
  private getPointsFromEvent(event: TouchEvent): ITouchPoint[] {
    event = event || window.event;
    let points = [],
      src;
    for (let t = 0, len = event.touches.length; t < len; t++) {
      src = event.touches[t];
      points.push({ x: src.pageX, y: src.pageY } as ITouchPoint);
    }
    return points;
  }
}
