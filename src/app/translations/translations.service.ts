import { Translation } from './translation.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations: Translation[] = [];
  // private json: JSON;

  constructor(private http: HttpClient) { }

  getTranslations(): Translation[] {
    this.http.get<{ message: string, translations: any }>('http://localhost:3000/api/pons/translation').subscribe((json) => {

      // console.log(json.translations.hits.roms.headword);

      json.translations[0].hits[0].roms[0].arabs.forEach(arab => {
        // console.log(translations.header);
        arab.translations.forEach(trans => {
          const translation: Translation = { wordToTranslate: 'Auto (testowe)', suggestedWord: '', translation: '' };


          translation.suggestedWord = trans.source.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
          translation.translation = trans.target.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');

          this.translations.push(translation);
        });
      });

      // console.log(json.translations); //dziala drukuje jsona fajnie
    });

    return this.translations;
  }
}
