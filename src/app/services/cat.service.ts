import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatImage } from '../models/cat.model';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private baseUrl = 'https://cataas.com';
  private favoritesKey = 'cat-favorites';

  constructor(private http: HttpClient) {}

  getCatWithText(text: string): Observable<CatImage> {
    const safeText = encodeURIComponent(text);
    return this.http.get<CatImage>(
      `${this.baseUrl}/cat/says/${safeText}?json=true&font=Impact&fontSize=50&fontColor=%23fff&fontBackground=none`
    );
  }

    // 🧡 FAVORITES
  getFavorites(): string[] {
    const favs = localStorage.getItem(this.favoritesKey);
    return favs ? JSON.parse(favs) : [];
  }

  toggleFavorite(url: string): void {
    let favs = this.getFavorites();
    if (favs.includes(url)) {
      favs = favs.filter(item => item !== url);
    } else {
      favs.unshift(url);
    }
    localStorage.setItem(this.favoritesKey, JSON.stringify(favs));
  }

  isFavorite(url: string): boolean {
    return this.getFavorites().includes(url);
  }

  clearFavorites(): void {
    localStorage.removeItem(this.favoritesKey);
  }
}
