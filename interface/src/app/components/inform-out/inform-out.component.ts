import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import {FileNameComponent} from '../file-name/file-name.component';

@Component({
  selector: 'app-inform-out',
  templateUrl: './inform-out.component.html',
  styleUrls: ['./inform-out.component.css']
})
export class InformOutComponent implements OnInit{
  componentRefFile!: ComponentRef<FileNameComponent>;
  data: File[] = [];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  // addComponent(files: File[]): void {
  //   let i = 0;
  //   let j = this.data.length;
  //   const size = files.length;
  //   while (i < size){
  //     this.data[j] = files[i];
  //     i++;
  //     j++;
  //   }
  //   this.createComponent();
  // }
  //
  // createComponent(): void {
  //   const componentFactoryFile = this.componentFactoryResolver.resolveComponentFactory(FileNameComponent);
  //   this.componentRefFile = this.viewContainerRef.createComponent(componentFactoryFile);
  //   this.componentRefFile.instance.setFiles(this.data);
  // }
  //
  // deleteComponent(): void {
  //   if (this.componentRefFile) {
  //     this.componentRefFile.destroy();
  //   }
  // }

  startConverter(): void {
    this.componentRefFile.instance.startConverter();
  }
}
