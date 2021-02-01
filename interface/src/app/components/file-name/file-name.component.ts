import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.css']
})
export class FileNameComponent {
  isArrayEmpty: boolean;
  files: File[] = [];
  filesObservable: Observable<File[]>;

  constructor() {
    this.isArrayEmpty = true;
    this.filesObservable = of(this.files);
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
    this.filesObservable = of(this.files);
    console.log(this.files[0].name);
    this.filesObservable.subscribe(p => console.log(p));
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
}
