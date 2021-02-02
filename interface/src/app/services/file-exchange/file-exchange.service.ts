import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {FileNameComponent} from '../../components/file-name/file-name.component';

@Injectable({
  providedIn: 'root'
})
export class FileExchangeService {
  componentRef!: ComponentRef<FileNameComponent>;

  constructor(
    // private fileName: FileNameComponent,
    // private loadArea: LoadingAreaComponent,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  // sendDataToFileName(data: File[]): void {
  //   this.fileName.setFiles(data);
  // }
  //
  // sendDataToLoadingAred(data: File[]): void {
  //   this.loadArea.setFiles(data);
  // }

  addComponent(files: File[]): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FileNameComponent);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.setFiles(files);
  }

  deleteComponent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
