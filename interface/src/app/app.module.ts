import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileSelectionComponent } from './components/file-selection/file-selection.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Icons} from './models/icons';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConverterComponent } from './components/converter/converter.component';
import { AddFilesComponent } from './components/add-files/add-files.component';
import {ProgressStatus} from './models/progress-status';
import { CleaningComponent } from './components/cleaning/cleaning.component';
import { HintComponent } from './components/hint/hint.component';
import {MatBadgeModule} from '@angular/material/badge';
import {HttpClientModule} from '@angular/common/http';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectionComponent,
    HeaderComponent,
    FooterComponent,
    ConverterComponent,
    AddFilesComponent,
    CleaningComponent,
    HintComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatBadgeModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    FileSelectionComponent,
    Icons,
    ProgressStatus
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
