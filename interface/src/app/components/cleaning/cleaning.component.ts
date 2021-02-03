import { Component, OnInit } from '@angular/core';
import {FileNameComponent} from '../file-name/file-name.component';

@Component({
  selector: 'app-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.css']
})
export class CleaningComponent implements OnInit {

  constructor(private fileName: FileNameComponent) { }

  ngOnInit(): void {
  }

  onCleaning(): void {
    this.fileName.deleteFiles();
  }
}
