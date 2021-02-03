import {Component, ComponentRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FileNameComponent} from '../file-name/file-name.component';

@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.css']
})
export class FileSelectionComponent implements OnInit, OnChanges {
  @Input() fileArray: File[] = [];
  isDisplay: boolean;
  @Input() isDisplayArea!: boolean;
  componentRefFile!: ComponentRef<FileNameComponent>;

  constructor() {
    this.isDisplay = true;
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
    this.fileArray = Array.from(files);
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
    this.fileArray = data;
  }

  setIsDisplay(is: boolean): void{
    this.isDisplay = is;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isDisplay = this.isDisplayArea;
    console.log(this.isDisplay);
  }
}
