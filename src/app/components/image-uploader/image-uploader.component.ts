import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, Input,
  OnInit,
  Output,
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, of, Subject, timer } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploaderComponent implements OnInit {
  @Input() showsPreview = false;
  @Output() public updateImage = new EventEmitter<string>();
  image64: string = '';

  constructor() {}

  ngOnInit(): void {}

  readonly control = new FormControl();

  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => (file ? this.renderFile(file) : of(null)))
  );

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.control.setValue(null);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  renderFile(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onload = () => {
      this.showImage(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error(error);
      this.showImage('');
    };
    return of(file).pipe(finalize(() => this.loadingFiles$.next(null)));
  }

  showImage(image64: string){
    this.image64 = image64;
    this.updateImage.emit(image64);
  }
}
