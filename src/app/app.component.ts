import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddBarcodeComponent } from '@components/add-barcode/add-barcode.component';
import { CanvasService } from '@services/canvas.service';
import { TuiTableBarsService } from '@taiga-ui/addon-tablebars';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CanvasService],
})
export class AppComponent implements AfterViewInit, OnInit {
  private readonly dialog = this.dialogService.open<string>(
    new PolymorpheusComponent(AddBarcodeComponent, this.injector),
    {}
  );
  @ViewChild('canvas') canvas?: ElementRef;
  @ViewChild(`tableBarTemplate`) tableBarTemplate: PolymorpheusContent = ``;
  //this.updateCanvasSize()
  barCodeImage?: HTMLImageElement;
  docImage?: HTMLImageElement;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiTableBarsService)
    private readonly tableBarsService: TuiTableBarsService,
    private canvasService: CanvasService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.tableBarsService
        .open(this.tableBarTemplate || ``, {
          hasCloseButton: false,
          adaptive: true,
        })
        .subscribe();
    });
  }
  ngAfterViewInit() {
    this.canvasService.initCanvas(this.canvas);
    this.updateCanvasSize();
  }

  @HostListener('window:resize') updateCanvasSize(): void {
    if (!this.canvas) {
      return;
    }
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight-72;
    this.canvasService.renderMainScene(this.docImage, this.barCodeImage);
  }
  showDialog(): void {
    this.dialog.subscribe({
      next: (data) => {
        this.addBarcodeImage(data);
      },
    });
  }

  public addBarcodeImage(barCode64: string) {
    this.barCodeImage = new Image();
    this.barCodeImage.onload = () => {
      this.canvasService.renderMainScene(this.docImage, this.barCodeImage);
    };
    this.barCodeImage.src = barCode64;
  }

  public setDocImage(document64: string) {
    this.docImage = new Image();
    this.docImage.onload = () => {
      this.canvasService.renderMainScene(this.docImage, this.barCodeImage);
    };
    this.docImage.src = document64;
  }
}
