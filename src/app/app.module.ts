import {TuiRootModule, TuiDialogModule, TuiLoaderModule, TuiDataListModule, TuiGroupModule} from "@taiga-ui/core";
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

@NgModule({
  declarations: [
    AppComponent
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
    TuiCheckboxLabeledModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
