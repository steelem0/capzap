import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';

import { AppFooterComponent } from 'src/app/components/app-footer/app-footer.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppFooterComponent,
    FavoritesPageRoutingModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}
