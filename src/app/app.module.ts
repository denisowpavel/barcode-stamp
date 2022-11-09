import {
  TuiRootModule,
  TuiDialogModule,
  TuiLoaderModule,
  TuiDataListModule,
  TuiGroupModule,
  TuiTextfieldControllerModule,
  TuiSvgModule,
  TuiButtonModule, TuiThemeNightModule, TuiModeModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputSliderModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputColorModule } from '@taiga-ui/addon-editor';
import { CreateBarcodeComponent } from './components/create-barcode/create-barcode.component';
import { AddBarcodeComponent } from './components/add-barcode/add-barcode.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { TuiTableBarsHostModule } from '@taiga-ui/addon-tablebars';

@NgModule({
  declarations: [
    AppComponent,
    CreateBarcodeComponent,
    AddBarcodeComponent,
    ImageUploaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiDataListModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputSliderModule,
    TuiInputColorModule,
    TuiRadioBlockModule,
    TuiGroupModule,
    TuiCheckboxLabeledModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    TuiTabsModule,
    TuiInputFilesModule,
    TuiTableBarsHostModule,
    TuiThemeNightModule,
    TuiModeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
