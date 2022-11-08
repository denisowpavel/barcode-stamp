import {Inject, Injectable} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { defaultEditorColors } from '@taiga-ui/addon-editor';
import { IFormatItem, IBarcodeSettings } from '@interfaces/index';
// @ts-ignore
import JsBarcode from 'jsbarcode';

@Injectable({
  providedIn: 'root',
})
export class BarcodeGeneratorService {
  readonly palette = defaultEditorColors;

  fontList: readonly string[] = [
    'Arial',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
  ];

  formatList: readonly IFormatItem[] = [
    { code: 'CODE128', label: 'CODE128 auto' },
    { code: 'CODE128A', label: 'CODE128 A' },
    { code: 'CODE128B', label: 'CODE128 B' },
    { code: 'CODE128C', label: 'CODE128 C' },
    { code: 'EAN13', label: 'EAN13' },
    { code: 'EAN8', label: 'EAN8' },
    { code: 'UPC', label: 'UPC' },
    { code: 'CODE39', label: 'CODE39' },
    { code: 'ITF14', label: 'ITF14' },
    { code: 'ITF', label: 'ITF' },
    { code: 'MSI', label: 'MSI' },
    { code: 'MSI10', label: 'MSI10' },
    { code: 'MSI11', label: 'MSI11' },
    { code: 'MSI1010', label: 'MSI1010' },
    { code: 'MSI1110', label: 'MSI1110' },
    { code: 'pharmacode', label: 'Pharmacode' },
  ];
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public generate(value: string, settings: IBarcodeSettings): any {
    const canvas = this.document.createElement('canvas');
    JsBarcode(canvas, value, settings);
    return canvas.toDataURL("image/png");
  }
}
