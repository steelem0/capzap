import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  moods = [
    { key: 'cute', label: 'Cute', emoji: '🥰' },
    { key: 'sassy', label: 'Sassy', emoji: '😼' },
    { key: 'roast', label: 'Roast', emoji: '🔥' },
    { key: 'comfort', label: 'Comfort', emoji: '💖' }
  ];

  moodTextMap: Record<string, string[]> = {
    cute: ['Purr-fectly sweet 💕', 'Snuggle me now!'],
    sassy: ['Not today, hooman.', 'Feed me and go.'],
    roast: ['You call *that* an outfit?', 'Try harder.'],
    comfort: ['You’re doing your best ❤️', 'Big purr energy.']
  };

  getMoods() {
    return this.moods;
  }

  getRandomCaption(moodKey: string): string {
    const pool = this.moodTextMap[moodKey] || this.moodTextMap['cute'];
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
