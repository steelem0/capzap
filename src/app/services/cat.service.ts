import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatImage } from '../models/cat.model';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private baseUrl = 'https://cataas.com';

  constructor(private http: HttpClient) {}

  getCatWithText(text: string): Observable<CatImage> {
    const safeText = encodeURIComponent(text);
    return this.http.get<CatImage>(
      `${this.baseUrl}/cat/says/${safeText}?json=true&font=Impact&fontSize=50&fontColor=%23fff&fontBackground=none`
    );
  }
}
