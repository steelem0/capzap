import { Component } from '@angular/core';
import { CatService } from '../services/cat.service';
import { ShareService } from '../services/share.service';
import { MoodService } from '../services/mood.service';
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
  darkMode = false;
  moods = this.moodService.getMoods();
  selectedMood: any = null;
  caption = '';

  constructor(
    private catService: CatService,
    private shareService: ShareService,
    private moodService: MoodService,
    private sanitizer: DomSanitizer,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {}

  ngOnInit() {
      // Load preference from localStorage or system
      const storedPref = localStorage.getItem('dark-mode');
      this.darkMode = storedPref ? storedPref === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(this.darkMode);
    }

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      this.setDarkMode(this.darkMode);
      localStorage.setItem('dark-mode', String(this.darkMode));
    }

    setDarkMode(enable: boolean) {
      document.body.classList.toggle('dark', enable);
    }

  selectMood(mood: any) {
    this.selectedMood = mood;
    this.generateCat();
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
