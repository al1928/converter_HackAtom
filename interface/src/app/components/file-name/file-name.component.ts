import {Component, Input, OnChanges, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Icons} from '../../models/icons';
import {ProgressStatus} from '../../models/progress-status';

@Component({
  selector: 'app-file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.css']
})
export class FileNameComponent implements OnChanges{

  indexDelete: number;
  private differenceBetweenBytesAndMegabytes = 1048576;
  private differenceBetweenBytesAndKilobytes = 1024;
  statusDownload: number;
  index: number;

  @Output() isDisplay = new EventEmitter<boolean>();
  @Input() files!: File[];
  data: Map<File, number> = new Map<File, number>();

  constructor(
    public progressStatus: ProgressStatus,
    private icons: Icons) {
    this.indexDelete = -1;
    this.index = -1;
    this.statusDownload = this.progressStatus.sent;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  deleteFiles(): void{
    this.data.clear();
    this.files.splice(0, this.files.length);
    console.log(this.files);
    if (this.files.length === 0){
      this.isDisplay.emit(true);
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
      this.isDisplay.emit(true);
    }
  }

  onDownload(file: File): void {
    if (this.data.get(file) !== this.progressStatus.loaded) {
      this.data.set(file, this.progressStatus.processing);
      setTimeout(() => {
        this.data.set(file, this.progressStatus.loaded);
      }, 3000);
    }
  }

  startConverter(): void {
    this.files.map(p => this.onDownload(p));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.files.map(p =>  this.data.set(p, this.progressStatus.sent));
  }
}

