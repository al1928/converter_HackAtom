import { Component, OnInit } from '@angular/core';
import {FileSelectionComponent} from '../file-selection/file-selection.component';

@Component({
  selector: 'app-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.css']
})
export class CleaningComponent implements OnInit {

  constructor(private fileSelection: FileSelectionComponent) { }

  ngOnInit(): void {
  }

  onCleaning(): void {
    this.fileSelection.deleteFiles();
  }
}
