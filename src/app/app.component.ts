import {Component, OnInit} from '@angular/core';
import JsBarcode /* , { Options as jsBarcodeOptions } */ from 'jsbarcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  px2mmFactor?: number;

  ngOnInit() {
    this.px2mmFactor = 1; // this.calcPx2MmFactor();

    let data: string = '230220119012';

    JsBarcode('#barcode', data, {
      format: 'code128', // default
      height: 100, // 10mm
      width: 2.3,
      // displayValue: false,
      text: '-' + data + '-',
      background: 'rgba(0,0,0,0.1)',
      font: 'monospace',
      fontOptions: 'bold',
      fontSize: 16,
      lineColor: 'darkblue',
      margin: 5,
      textMargin: 2,
      textAlign: 'right',
      textPosition: 'button',
    });
  }
}
