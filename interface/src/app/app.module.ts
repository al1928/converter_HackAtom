import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingAreaComponent } from './loading-area/loading-area.component';
import { FileSelectionComponent } from './file-selection/file-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { InformOutComponent } from './inform-out/inform-out.component';
import { FileNameComponent } from './file-name/file-name.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAreaComponent,
    FileSelectionComponent,
    InformOutComponent,
    FileNameComponent
  ],
  entryComponents: [FileNameComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule
    ],
  providers: [InformOutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
