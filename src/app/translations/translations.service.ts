import { Translation } from './translation.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations: Translation[] = [];

  constructor(private http: HttpClient) { }

  postTranslations(userInput: string, languagesFromTo: string): Observable<Translation[]> {

    this.http.post<any>(
      'http://localhost:3000/api/pons/translation',
      { languages: languagesFromTo, word: userInput }).subscribe((json) => {
        const isNoTranslation = json == null;
        if (isNoTranslation) {
          this.translations.length = 0;
        } else {
          json.translations[0].hits[0].roms[0].arabs.forEach(arab => {
            arab.translations.forEach(trans => {
              const translation: Translation = {
                userInputToSearch: userInput,
                suggestedWord: '',
                translation: '',
                isChecked: false,
                languageFrom: languagesFromTo.substring(0, 2),
                languageTo: languagesFromTo.substring(2, 4),
              };

              translation.suggestedWord = trans.source.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
              translation.translation = trans.target.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');

              this.translations.push(translation);
            });
          });
        }
      });
    return of(this.translations);
  }
}
