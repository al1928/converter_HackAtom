import {Component, OnInit} from '@angular/core';
import {FileSelectionComponent} from '../file-selection/file-selection.component';

@Component({
  selector: 'app-loading-area',
  templateUrl: './loading-area.component.html',
  styleUrls: ['./loading-area.component.css']
})
export class LoadingAreaComponent implements OnInit {
  public isDragenter: boolean;

  constructor(private fileSelection: FileSelectionComponent) {
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
      this.fileSelection.loadingFiles(files);
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
