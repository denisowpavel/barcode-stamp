import {
  TuiRootModule,
  TuiDialogModule,
  TuiLoaderModule,
  TuiDataListModule,
  TuiGroupModule,
  TuiTextfieldControllerModule, TuiSvgModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputSliderModule,
  TuiRadioBlockModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiInputColorModule} from "@taiga-ui/addon-editor";
import { CreateBarcodeComponent } from './components/create-barcode/create-barcode.component';
import { AddBarcodeComponent } from './components/add-barcode/add-barcode.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBarcodeComponent,
    AddBarcodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
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
    TuiSvgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
