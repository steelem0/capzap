import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteViewerPage } from './favorite-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteViewerPageRoutingModule {}
