import { Component, OnInit } from '@angular/core';
import {FileSelectionComponent} from '../file-selection/file-selection.component';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  constructor(private fileSelection: FileSelectionComponent) { }

  ngOnInit(): void {
  }

  onConverter(): void {
    this.fileSelection.startConverter();
  }
}
