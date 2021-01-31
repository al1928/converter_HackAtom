import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-area',
  templateUrl: './loading-area.component.html',
  styleUrls: ['./loading-area.component.css']
})
export class LoadingAreaComponent implements OnInit {
  public isDragenter: boolean;

  constructor() {
    this.isDragenter = false;
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
    console.log(files[0].name);
  }
}
