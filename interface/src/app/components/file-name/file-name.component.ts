import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Icons} from '../../models/icons';

@Component({
  selector: 'app-file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.css']
})
export class FileNameComponent{
  progressStatus = {
    sent : 1,
    processing : 2,
    loaded: 3
  };

  isArrayEmpty: boolean;
  files: File[] = [];
  indexDelete: number;
  isEmpty: boolean;
  private differenceBetweenBytesAndMegabytes = 1048576;
  private differenceBetweenBytesAndKilobytes = 1024;
  statusDownload: number;
  index: number;

  data: Map<File, number> = new Map<File, number>();

  constructor(
    private icons: Icons) {
    this.isArrayEmpty = true;
    this.indexDelete = -1;
    this.index = -1;
    this.isEmpty = true;
    this.statusDownload = this.progressStatus.sent;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  setFiles(files: File[]): void {
    this.isArrayEmpty = false;
    this.files = files;

    files.map(p =>  this.data.set(p, this.progressStatus.sent));

    console.log(this.files);
  }

  deleteFiles(file: File): void{
    const index = this.files.indexOf(file, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    if (this.files.length === 0){
      this.isArrayEmpty = true;
    }
  }

  calculate(size: number): string {
    if (size > this.differenceBetweenBytesAndMegabytes) {
      const sizeMB = size / this.differenceBetweenBytesAndMegabytes;
      return parseFloat(sizeMB.toFixed(2)) + ' MBytes';
    } else if (size > this.differenceBetweenBytesAndKilobytes) {
      const sizeKB = size / this.differenceBetweenBytesAndKilobytes;
      return parseFloat(sizeKB.toFixed(2)) + ' KBytes';
    } else {
      return size + ' Bytes';
    }
  }

  getIcon(name: string): string {
    return this.icons.data.mp3;
  }

  onClear(i: number): void {
    this.indexDelete = i;
    const index = this.files.indexOf(this.files[i], 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    if (this.files.length <= 0 ){
      this.isEmpty = false;
    }
  }

  onDownload(file: File): void {
    this.data.set(file, this.progressStatus.processing);
    setTimeout(() => {
      this.data.set(file, this.progressStatus.loaded);
    }, 3000);
  }
}

