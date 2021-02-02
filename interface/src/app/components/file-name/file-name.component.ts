import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.css']
})
export class FileNameComponent {
  isArrayEmpty: boolean;
  files: File[] = [];
  private differenceBetweenBytesAndMegabytes = 1048576;
  private differenceBetweenBytesAndKilobytes = 1024;

  constructor() {
    this.isArrayEmpty = true;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  setFiles(files: File[]): void {
    this.isArrayEmpty = false;
    let i = 0;
    const size = files.length;
    while (i < size){
      this.files[i] = files[i];
      i++;
    }
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
}
