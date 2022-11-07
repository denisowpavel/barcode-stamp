import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-barcode',
  templateUrl: './add-barcode.component.html',
  styleUrls: ['./add-barcode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBarcodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
