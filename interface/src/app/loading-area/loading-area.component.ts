import { Component, OnInit } from '@angular/core';
import {InformOutComponent} from '../inform-out/inform-out.component';
import {FileNameComponent} from '../file-name/file-name.component';

@Component({
  selector: 'app-loading-area',
  templateUrl: './loading-area.component.html',
  styleUrls: ['./loading-area.component.css']
})
export class LoadingAreaComponent implements OnInit {
  public isDragenter: boolean;
  public fileNameComponent: FileNameComponent;

  constructor(private informOutComponent: InformOutComponent) {
    this.isDragenter = false;
    this.fileNameComponent = new FileNameComponent();
  }

  ngOnInit(): void {
  }

  onDrop($event: any): void {
    this.isDragenter = false;
    $event.preventDefault();
    $event.stopPropagation();
    if ($event.dataTransfer.files) {
      const files: FileList = $event.dataTransfer.files;
      this.loadingFiles(files);
    }
  }

  dragenter($event: any): void {
    this.isDragenter = false;
    $event.preventDefault();
  }

  dragover($event: any): void {
    this.isDragenter = true;
    $event.preventDefault();
  }

  dragleave($event: any): void {
    this.isDragenter = false;
    $event.preventDefault();
  }

  loadingFiles(files: FileList): void {
    const name = files[0].name;
    console.log(name);
    this.informOutComponent.addComponent(name);
  }
}
