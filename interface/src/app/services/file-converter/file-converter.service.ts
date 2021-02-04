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
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', '*');

    const formData = new FormData();
    formData.append('file', file);


    return this.api.post('postFiles', formData, headers);
  }
}
