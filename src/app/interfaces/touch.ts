export interface ITouchPoint {
  x: number;
  y: number;
}

export interface ITouchSet {
  start?: ITouchPoint[];
  move?: ITouchPoint[];
}
