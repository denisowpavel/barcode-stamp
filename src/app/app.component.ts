import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Injector,
  ViewChild,
} from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddBarcodeComponent } from '@components/add-barcode/add-barcode.component';
import { CanvasService } from '@services/canvas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CanvasService],
})
export class AppComponent implements AfterViewInit {
  private readonly dialog = this.dialogService.open<string>(
    new PolymorpheusComponent(AddBarcodeComponent, this.injector),
    {}
  );
  @ViewChild('canvas') canvas?: ElementRef;
  constructor(
    private canvasService: CanvasService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngAfterViewInit() {
    this.canvasService.initCanvas(this.canvas);
  }

  showDialog(): void {
    this.dialog.subscribe({
      next: (data) => {
        this.addBarcodeImage(data);
      },
    });
  }

  public addBarcodeImage(barCode64: string) {
    let barCodeImage = new Image();
    barCodeImage.onload = () => {
      this.canvasService.addImage(barCodeImage);
    };
    barCodeImage.src = barCode64;
  }

  public setDocImage(document64: string) {
    let docImage = new Image();
    docImage.onload = () => {
      this.canvasService.clearCanvas();
      this.canvasService.addBg();
      this.canvasService.addImage(docImage);
    };
    docImage.src = document64;
  }
}
