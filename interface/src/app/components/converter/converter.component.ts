import { Component, OnInit } from '@angular/core';
import {InformOutComponent} from '../inform-out/inform-out.component';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  constructor(private informOut: InformOutComponent) { }

  ngOnInit(): void {
  }

  onConverter(): void {
    this.informOut.startConverter();
  }
}
