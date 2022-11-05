import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { FormControl, FormGroup } from '@angular/forms';
import { defaultEditorColors } from '@taiga-ui/addon-editor';

interface IFormat {
  readonly code: string;
  readonly label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
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
  formatList: readonly IFormat[] = [
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

  barcodeSetForm = new FormGroup({
    text: new FormControl('1234567890128'),
    format: new FormControl('CODE128'),
    height: new FormControl(100),
    width: new FormControl(2.3),
    displayValue: new FormControl(false),
    background: new FormControl('#FFFFFF'),
    lineColor: new FormControl('#000000'),
    margin: new FormControl(5),
    font: new FormControl('monospace'),
    fontSize: new FormControl(16),
    textMargin: new FormControl(2),
    textAlign: new FormControl('right'),
  });

  get barcodeTextControl() {
    return this.barcodeSetForm.controls.text as FormControl;
  }
  ngOnInit() {
    this.barcodeSetForm.valueChanges.subscribe((data) => {
      this.updateBarcodeImage(data);
    });
    this.updateBarcodeImage(this.barcodeSetForm.value);
  }

  setTextValidateStatus(status: boolean) {
    this.barcodeTextControl.setErrors(!!status ? null : { incorrect: true });
  }

  updateBarcodeImage(data: any) {
    JsBarcode('#barcode', data.text, {
      ...data,
      valid: this.setTextValidateStatus.bind(this),
    });
  }
}
