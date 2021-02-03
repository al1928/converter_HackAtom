import {Component, OnInit} from '@angular/core';
import {FileSelectionComponent} from '../file-selection/file-selection.component';

@Component({
  selector: 'app-loading-area',
  templateUrl: './loading-area.component.html',
  styleUrls: ['./loading-area.component.css']
})
export class LoadingAreaComponent implements OnInit {
  isDragenter: boolean;
  isDisplayArea = true;
  files: File[] = [];

  constructor() {
    this.isDragenter = false;
  }

  ngOnInit(): void {
  }

  onDrop($event: any): void {
    this.isDisplayArea = false;
    this.isDragenter = false;
    $event.preventDefault();
    $event.stopPropagation();
    if ($event.dataTransfer.files) {
      const files: FileList = $event.dataTransfer.files;
      this.files = this.files.concat(Array.from(files));
      console.log(this.files);
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
}
