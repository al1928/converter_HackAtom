import { Component, OnInit } from '@angular/core';
import {FileSelectionComponent} from '../file-selection/file-selection.component';

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.css']
})
export class AddFilesComponent implements OnInit {

  constructor(private fileSelection: FileSelectionComponent) { }

  ngOnInit(): void {
  }

  importFile($event: any): void {
    this.fileSelection.importFile($event);
  }
}
