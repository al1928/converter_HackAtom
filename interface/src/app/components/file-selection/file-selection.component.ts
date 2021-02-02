import { Component, OnInit } from '@angular/core';
import {InformOutComponent} from '../inform-out/inform-out.component';

@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.css']
})
export class FileSelectionComponent implements OnInit {
  private fileArray: File[] = [];

  constructor(private informOut: InformOutComponent) {
  }

  ngOnInit(): void {
  }

  importFile($event: any): void {
    if ($event.target.files.length === 0) {
      console.log('No file selected!');
      return;
    }
    const files: FileList = $event.target.files;
    this.loadingFiles(files);
  }

  loadingFiles(files: FileList): void {
    const name = files[0].name;
    console.log(name);
    this.fileArray = Array.from(files);
    this.informOut.deleteComponent();
    this.informOut.addComponent(this.fileArray);
  }

  setFiles(data: File[]): void {
    this.fileArray = data;
  }
}
