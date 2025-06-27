import { Component } from '@angular/core';
import { CatService } from '../services/cat.service';
import { ShareService } from '../services/share.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  customText = '';
  catImageUrl: SafeResourceUrl | null = null;
  rawCatUrl: string = '';
  loading = false;


  constructor(
    private catService: CatService,
    private shareService: ShareService,
    private sanitizer: DomSanitizer,
     private toastCtrl: ToastController,
     private platform: Platform
  ) {}

  get isMobile(): boolean {
    return this.platform.is('hybrid') || this.platform.is('mobile');
  }

  generateCat() {
    const text = this.customText.trim() || 'Meow!';
    this.loading = true;

    this.catService.getCatWithText(text).subscribe({
      next: (response) => {
        this.catImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${response.url}`);
        this.rawCatUrl = `${response.url}`;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cat image:', err);
        this.loading = false;
      }
    });
  }

  async shareCat() {

    if (!this.rawCatUrl) return;
    const result = await this.shareService.shareLink(
      'Check out this CatZap!',
      'Here’s a cat just for you 😺',
      this.rawCatUrl,
      'Share this cat meme'
    );

    const toast = await this.toastCtrl.create({
      message: result === 'shared' ? 'Cat shared!' : 'Link copied to clipboard!',
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }

}
