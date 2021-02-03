import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingAreaComponent } from './components/loading-area/loading-area.component';
import { FileSelectionComponent } from './components/file-selection/file-selection.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InformOutComponent } from './components/inform-out/inform-out.component';
import { FileNameComponent } from './components/file-name/file-name.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Icons} from './models/icons';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConverterComponent } from './components/converter/converter.component';
import { AddFilesComponent } from './components/add-files/add-files.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAreaComponent,
    FileSelectionComponent,
    InformOutComponent,
    FileNameComponent,
    HeaderComponent,
    FooterComponent,
    ConverterComponent,
    AddFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  providers: [
    InformOutComponent,
    FileNameComponent,
    FileSelectionComponent,
    Icons
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
