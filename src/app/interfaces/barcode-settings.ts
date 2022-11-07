export interface IBarcodeSettings {
  readonly code: string;
  text?: string;
  format?: string;
  height?: number;
  width?: number;
  displayValue?: boolean;
  background?: string;
  lineColor?: string;
  margin?: number;
  font?: string;
  fontSize?: number;
  textMargin?: number;
  textAlign?: string;
  valid?: any;
}
