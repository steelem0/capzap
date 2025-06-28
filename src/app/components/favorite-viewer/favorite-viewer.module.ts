import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteViewerPageRoutingModule } from './favorite-viewer-routing.module';

import { FavoriteViewerPage } from './favorite-viewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteViewerPageRoutingModule
  ],
  declarations: [FavoriteViewerPage]
})
export class FavoriteViewerPageModule {}
