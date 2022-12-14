import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BarcodeGeneratorService } from '@services/barcode-generator.service';
import { CanvasService } from '@services/canvas.service';
import { FormControl, FormGroup } from '@angular/forms';
import { IBarcodeSettings } from '@interfaces/barcode-settings';
import { debounceTime, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-barcode',
  templateUrl: './create-barcode.component.html',
  styleUrls: ['./create-barcode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CanvasService],
})
export class CreateBarcodeComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  ngUnsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('canvas') canvas?: ElementRef;
  @Output() public updateImage = new EventEmitter<string>();

  areAllImagesLoaded = false;

  constructor(
    public generatorService: BarcodeGeneratorService,
    private canvasService: CanvasService
  ) {}

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
    this.barcodeSetForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe), debounceTime(25))
      .subscribe((data) => {
        this.updateBarcodeImage(data);
      });
    this.updateBarcodeImage(this.barcodeSetForm.value);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit() {
    this.canvasService.initCanvas(this.canvas);
  }

  setTextValidateStatus(status: boolean) {
    this.barcodeTextControl.setErrors(!!status ? null : { incorrect: true });
  }

  updateBarcodeImage(data: any) {
    let barCodeImage = new Image();
    barCodeImage.onload = () => {
      this.canvasService.clearCanvas();
      this.canvasService.addBg();
      this.canvasService.addImage(barCodeImage);
    };
    barCodeImage.src = this.generatorService.generate(data.text, {
      ...data,
      valid: this.setTextValidateStatus.bind(this),
    } as IBarcodeSettings);

    this.updateImage.emit(barCodeImage.src);
  }
}
