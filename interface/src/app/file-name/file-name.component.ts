import {Component, Input, EventEmitter, Output, OnInit, ViewContainerRef} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FileNameComponent {
  public name = '';
}
