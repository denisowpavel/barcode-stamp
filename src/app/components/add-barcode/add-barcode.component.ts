import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'app-add-barcode',
  templateUrl: './add-barcode.component.html',
  styleUrls: ['./add-barcode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBarcodeComponent implements OnInit {
  activeItemIndex = 0;
  public image64 = '';
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string>
  ) {}

  ngOnInit(): void {}

  public setImage(base64: string) {
    this.image64 = base64;
  }

  submit(): void {
    this.context.completeWith(this.image64);
  }

  cancel(): void {
    this.context.completeWith('');
  }
}
