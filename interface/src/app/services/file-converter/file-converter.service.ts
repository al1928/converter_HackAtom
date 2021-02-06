import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileConverterService {

  constructor(private api: ApiService) { }

  getTextFiles(file: File): Observable<Blob> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'text/plain');
    const type = file.name.substr(file.name.length - 3, file.name.length);
    const blob = new Blob([file], { type: 'audio/' + type});
    const formData = new FormData();
    formData.append('file', blob);
    if (type === 'mp3') {
      return this.api.post('file-mp3', formData, headers);
    } else {
      return this.api.post('file-wav', formData, headers);
    }
  }
}
