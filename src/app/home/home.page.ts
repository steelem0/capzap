import { Component } from '@angular/core';
import { CatService } from '../services/cat.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  customText = '';
  catImageUrl: SafeResourceUrl | null = null;
  loading = false;

  constructor(private catService: CatService, private sanitizer: DomSanitizer) {}

  generateCat() {
    const text = this.customText.trim() || 'Meow!';
    this.loading = true;

    this.catService.getCatWithText(text).subscribe({
      next: (response) => {
        this.catImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${response.url}`);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cat image:', err);
        this.loading = false;
      }
    });
  }
}
