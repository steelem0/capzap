import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-favorite-viewer',
  templateUrl: './favorite-viewer.page.html',
  styleUrls: ['./favorite-viewer.page.scss'],
  standalone: false
})
export class FavoriteViewerPage {
  @Input() imageUrl: string = '';

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
