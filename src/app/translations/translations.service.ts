import { environment } from './../../environments/environment';
import { Translation } from './translation.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const BACKEND_URL = environment.apiUrl;
const BACKEND_TRANSLATION_URL = BACKEND_URL + '/pons/translation';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translations: Translation[] = [];

  constructor(private http: HttpClient) { }

  postTranslations(userInput: string, languagesFromTo: string): Observable<Translation[]> {

    this.http.post<any>(BACKEND_TRANSLATION_URL, { languages: languagesFromTo, word: userInput }).subscribe((json) => {
      this.translations.length = 0;
      const isTranslationAvailable = json != null;
      if (isTranslationAvailable) {
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

            translation.suggestedWord = this.removeHTMLfromJSON(trans.source);
            translation.translation = this.removeHTMLfromJSON(trans.target);

            this.translations.push(translation);
          });
        });
      }
    });
    return of(this.translations);
  }

  private removeHTMLfromJSON(input: string) {
    return input.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
  }
}
