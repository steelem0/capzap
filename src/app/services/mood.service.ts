import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
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

  private groqUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor(private http: HttpClient) {}

  getMoods() {
    return this.moods;
  }

  getRandomCaption(moodKey: string): string {
    const pool = this.moodTextMap[moodKey] || this.moodTextMap['cute'];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  async getAICaption(mood: string): Promise<string> {
    try {
      const prompt = `Write a short, funny cat meme caption with the mood: ${mood}. Limit to 15 words.`;

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.groqApiKey}`
      };

      const body = {
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are a humorous cat meme writer.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9,
        max_tokens: 50
      };

      const response: any = await this.http
        .post(this.groqUrl, body, { headers })
        .toPromise();

      return response?.choices?.[0]?.message?.content?.trim() || this.getRandomCaption(mood);
    } catch (err) {
      console.warn('Groq failed, falling back to local caption:', err);
      return this.getRandomCaption(mood);
    }
  }
}
