import {Component, ComponentRef, OnInit} from '@angular/core';
import {FileNameComponent} from '../file-name/file-name.component';

@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.css']
})
export class FileSelectionComponent implements OnInit {
  fileArray: File[] = [];
  isDisplay: boolean;
  componentRefFile!: ComponentRef<FileNameComponent>;

  constructor() {
    this.isDisplay = true;
  }

  ngOnInit(): void {
  }

  importFile($event: any): void {
    if (this.isDisplay) {
      this.isDisplay = false;
    }
    if ($event.target.files.length === 0) {
      console.log('No file selected!');
      return;
    }
    const files: FileList = $event.target.files;
    this.loadingFiles(files);
  }

  loadingFiles(files: FileList): void {
    const name = files[0].name;
    console.log(name);
    this.fileArray = Array.from(files);
    // this.deleteComponent();
    // this.createComponent();
    console.log(this.fileArray);
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
}
