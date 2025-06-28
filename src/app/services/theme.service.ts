import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeKey = 'dark-mode';

  isDarkMode(): boolean {
    const storedPref = localStorage.getItem(this.darkModeKey);
    return storedPref
      ? storedPref === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  applyTheme(enableDark: boolean): void {
    document.body.classList.toggle('dark', enableDark);
    localStorage.setItem(this.darkModeKey, String(enableDark));
  }

  toggleTheme(): boolean {
    const current = this.isDarkMode();
    const newState = !current;
    this.applyTheme(newState);
    return newState;
  }
}
