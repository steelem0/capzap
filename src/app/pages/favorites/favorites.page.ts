import { Component } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { ShareService } from '../../services/share.service';
import { ToastController } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';
import { ModalController } from '@ionic/angular';
import { FavoriteViewerPage } from '../../components/favorite-viewer/favorite-viewer.page';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false
})
export class FavoritesPage {
  favorites: string[] = [];
  darkMode = false;
  enterSparkles = true;
  removing = new Set<string>();

  constructor(
    private catService: CatService,
    private themeService: ThemeService,
    private shareService: ShareService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.favorites = this.catService.getFavorites();
    this.darkMode = this.themeService.isDarkMode();
    this.themeService.applyTheme(this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = this.themeService.toggleTheme();
  }

  removeFromFavorites(url: string) {
    this.removing.add(url);
    setTimeout(() => {
      this.catService.toggleFavorite(url);
      this.removing.delete(url);
      this.favorites = this.catService.getFavorites();
    }, 400); // match animation duration
  }

  async shareCat(url: string) {
    const result = await this.shareService.shareLink(
      'Check out this CatZap!',
      'Here’s a cat I saved 😻',
      url,
      'Share your favorite cat meme'
    );

    const toast = await this.toastCtrl.create({
      message: result === 'shared' ? 'Cat shared!' : 'Link copied to clipboard!',
      duration: 2000,
      color: result === 'shared' ? 'success' : 'warning'
    });
    await toast.present();
  }

  async viewFavorite(catUrl: string) {

    console.log('Opening modal for:', catUrl); // ← add this to confirm the click is working

    const modal = await this.modalCtrl.create({
      component: FavoriteViewerPage,
      componentProps: { imageUrl: catUrl },
      cssClass: 'full-modal',
      backdropDismiss: true,
      showBackdrop: true
    });

    await modal.present();
  }

}
