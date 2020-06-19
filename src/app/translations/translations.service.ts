import { Translation } from './translation.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations: Translation[] = [];

  constructor(private http: HttpClient) { }

  getTranslations(): Translation[] {
    this.http.get<{ message: string, translations: any }>('http://localhost:3000/api/pons/translation').subscribe((json) => {

      json.translations[0].hits[0].roms[0].arabs.forEach(arab => {
        arab.translations.forEach(trans => {
          const translation: Translation = { wordToTranslate: 'Auto (testowe)', suggestedWord: '', translation: '' };

          translation.suggestedWord = trans.source.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
          translation.translation = trans.target.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');

          this.translations.push(translation);
        });
      });
    });

    return this.translations;
  }

  postTranslations(userInput: string, languagesFromTo: string): Translation[] {
    console.log('[translation service] userInput: ' + userInput);
    console.log('[translation service] languages: ' + languagesFromTo);

    this.http.post<any>(
      'http://localhost:3000/api/pons/translation',
      { languages: languagesFromTo, word: userInput }).subscribe((json) => {

        json.translations[0].hits[0].roms[0].arabs.forEach(arab => {
          arab.translations.forEach(trans => {
            const translation: Translation = { wordToTranslate: userInput, suggestedWord: '', translation: '' };

            translation.suggestedWord = trans.source.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
            translation.translation = trans.target.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');

            this.translations.push(translation);
          });
        });
      });
    return this.translations;
  }
}
