import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteViewerPage } from './favorite-viewer.page';

describe('FavoriteViewerPage', () => {
  let component: FavoriteViewerPage;
  let fixture: ComponentFixture<FavoriteViewerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
