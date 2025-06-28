import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatService {
  private baseUrl = 'https://cataas.com/cat';
  private favoritesKey = 'cat-favorites';

  constructor(private http: HttpClient) {}

  getCatWithText(text: string, tag: string = '', options: { fontSize?: number } = {}): Observable<{ url: string }> {

    const safeText = encodeURIComponent(text);
    const fontSize = options.fontSize || 40;
    const baseUrl = `https://cataas.com/cat/says/${safeText}`;


    const url = `${baseUrl}?fit=cover&position=center&font=Impact&fontSize=30&fontColor=%23fff&fontBackground=none&width=2000&height=3000`;

    return this.http.get<{ url: string }>(url).pipe(
      map(() => ({ url })) // API returns JSON but we already constructed the final image URL
    );
  }

  truncateText(text: string, maxLength: number = 60): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
  }

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
