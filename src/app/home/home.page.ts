import { Component } from '@angular/core';
import { CatService } from '../services/cat.service';
import { ShareService } from '../services/share.service';
import { MoodService } from '../services/mood.service';
import { ThemeService } from '../services/theme.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController, Platform } from '@ionic/angular';

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
  isFavorited = false;
  showHeartAnimation = false;
  showPulse = false;

  constructor(
    private catService: CatService,
    private shareService: ShareService,
    private moodService: MoodService,
    private themeService: ThemeService,
    private sanitizer: DomSanitizer,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {}

    ngOnInit() {
      const darkPref = this.themeService.isDarkMode();
      this.darkMode = darkPref;
      this.themeService.applyTheme(darkPref);
    }

    toggleDarkMode() {
      this.darkMode = this.themeService.toggleTheme();
    }



  selectMood(mood: any) {
    this.selectedMood = mood;
    this.generateCat();
  }

  async generateCat() {
    this.loading = true;

    // If a mood is selected, generate a caption from the LLM
    const moodKey = this.selectedMood?.key;
    const text = moodKey
      ? await this.moodService.getAICaption(moodKey)
      : this.customText.trim() || 'Meow!';

    this.caption = text;

    this.catService.getCatWithText(text, moodKey || "cat").subscribe({
      next: (response) => {
        this.catImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response.url);
        this.rawCatUrl = response.url;
        this.loading = false;
        this.isFavorited = this.catService.isFavorite(this.rawCatUrl);
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

  toggleFavorite() {
    if (!this.rawCatUrl) return;

    this.catService.toggleFavorite(this.rawCatUrl);
    this.isFavorited = this.catService.isFavorite(this.rawCatUrl);

    if (this.isFavorited) {
      this.showHeartAnimation = true;
      setTimeout(() => {
        this.showHeartAnimation = false;
      }, 800);
    }
  }

  onImageLoad() {
    this.showPulse = true;
    setTimeout(() => {
      this.showPulse = false;
    }, 400);
  }
}
