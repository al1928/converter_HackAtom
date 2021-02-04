import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ProgressStatus} from '../../models/progress-status';
import {Icons} from '../../models/icons';
import {FileConverterService} from '../../services/file-converter/file-converter.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.css']
})
export class FileSelectionComponent implements OnInit {
  files: File[] = [];
  isDisplay: boolean;
  isDragenter: boolean;
  // componentRefFile!: ComponentRef<FileNameComponent>;
  indexDelete: number;
  private differenceBetweenBytesAndMegabytes = 1048576;
  private differenceBetweenBytesAndKilobytes = 1024;
  statusDownload: number;
  index: number;
  data: Map<File, number> = new Map<File, number>();

  constructor(
    public progressStatus: ProgressStatus,
    private icons: Icons,
    private fileConverter: FileConverterService) {
    this.indexDelete = -1;
    this.index = -1;
    this.statusDownload = this.progressStatus.sent;
    this.isDisplay = true;
    this.isDragenter = false;
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
    this.files = this.files.concat(Array.from(files));
    if (this.isDisplay) {
      this.isDisplay = false;
    }
  }

  // createComponent(): void {
  //   const componentFactoryFile = this.componentFactoryResolver.resolveComponentFactory(FileNameComponent);
  //   this.componentRefFile = this.viewContainerRef.createComponent(componentFactoryFile);
  //   this.componentRefFile.instance.setFiles(this.fileArray);
  // }
  //
  // deleteComponent(): void {
  //   if (this.componentRefFile) {
  //     this.componentRefFile.destroy();
  //   }
  // }

  setFiles(data: File[]): void {
    this.files = data;
  }

  onDrop($event: any): void {
    this.isDragenter = false;
    if (this.isDisplay) {
      this.isDisplay = false;
    }
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

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  deleteFiles(): void{
    this.data.clear();
    this.files.splice(0, this.files.length);
    console.log(this.files);
    if (this.files.length === 0){
      this.isDisplay = true;
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
    const type = name.substr(name.length - 3, name.length);
    if (type === 'mp3') {
      return this.icons.data.mp3;
    } else {
      return this.icons.data.wav;
    }
  }

  onClear(i: number): void {
    this.indexDelete = i;
    const index = this.files.indexOf(this.files[i], 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
    if (this.files.length <= 0 ){
      this.isDisplay = true;
    }
  }

  onDownload(file: File): void {
    if (this.data.get(file) !== this.progressStatus.loaded) {
      this.data.set(file, this.progressStatus.processing);

      const dataBlob: Observable<Blob> = this.fileConverter.getTextFiles(file);
      dataBlob.subscribe( value => {
        const blob = new Blob([value],
          { type: 'text/plain'});

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'test.txt';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

        setTimeout(() => {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
      this.data.set(file, this.progressStatus.loaded);
    }
  }

  startConverter(): void {
    this.files.map(p => this.onDownload(p));
  }
}
