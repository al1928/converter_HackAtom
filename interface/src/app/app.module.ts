import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingAreaComponent } from './components/loading-area/loading-area.component';
import { FileSelectionComponent } from './components/file-selection/file-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { InformOutComponent } from './components/inform-out/inform-out.component';
import { FileNameComponent } from './components/file-name/file-name.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAreaComponent,
    FileSelectionComponent,
    InformOutComponent,
    FileNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    InformOutComponent,
    FileNameComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
