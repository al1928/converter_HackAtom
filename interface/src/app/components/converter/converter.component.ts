import { Component, OnInit } from '@angular/core';
import {FileNameComponent} from '../file-name/file-name.component';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  constructor(private fileName: FileNameComponent) { }

  ngOnInit(): void {
  }

  onConverter(): void {
    this.fileName.startConverter();
  }
}
