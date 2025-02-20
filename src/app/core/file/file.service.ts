import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviorment } from '../../../enviorments/enviorments';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly imageApiUrl = enviorment.imagesUrl;

  constructor(private http: HttpClient) {}

  getFile(filename: string) {
    return this.http.get(`${this.imageApiUrl}/${filename}`, {
      responseType: 'blob',
    });
  }
}
