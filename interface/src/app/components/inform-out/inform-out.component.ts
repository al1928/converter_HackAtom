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
  componentRef!: ComponentRef<FileNameComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

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
