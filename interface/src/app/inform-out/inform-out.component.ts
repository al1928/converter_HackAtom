import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, Type, ViewContainerRef} from '@angular/core';
import {FileNameComponent} from '../file-name/file-name.component';

@Component({
  selector: 'app-inform-out',
  templateUrl: './inform-out.component.html',
  styleUrls: ['./inform-out.component.css']
})
export class InformOutComponent implements OnInit{

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  addComponent(name: string): void {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FileNameComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.name = name;
  }

}
