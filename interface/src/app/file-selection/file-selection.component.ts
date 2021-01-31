import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.css']
})
export class FileSelectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  importFile($event: any): void {
    if ($event.target.files.length === 0) {
      console.log('No file selected!');
      return;
    }
    const file: File = $event.target.files[0];
    console.log(file.name);
  }
}
