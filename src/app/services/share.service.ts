import { Injectable } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  async shareLink(title: string, text: string, url: string, dialogTitle?: string): Promise<'shared' | 'copied'> {
    const canUseNativeShare = !!navigator.share;

    if (canUseNativeShare) {
      try {
        await Share.share({
          title,
          text,
          url,
          dialogTitle: dialogTitle || 'Share',
        });
        return 'shared';
      } catch (e) {
        console.warn('Share failed, falling back to copy:', e);
      }
    }

    await Clipboard.write({ string: url });
    return 'copied';
  }
}
