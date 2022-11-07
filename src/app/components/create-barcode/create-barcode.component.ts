import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BarcodeGeneratorService } from '@services/barcode-generator.service';
import { FormControl, FormGroup } from '@angular/forms';
import { IBarcodeSettings } from '@interfaces/barcode-settings';

@Component({
  selector: 'app-create-barcode',
  templateUrl: './create-barcode.component.html',
  styleUrls: ['./create-barcode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBarcodeComponent implements OnInit {
  constructor(public generatorService: BarcodeGeneratorService) {}
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
    this.generatorService.generate(data.text, {
      ...data,
      valid: this.setTextValidateStatus.bind(this),
    } as IBarcodeSettings);
  }
}
