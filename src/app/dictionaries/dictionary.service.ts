import { environment } from './../../environments/environment';
import { Dictionary } from './dictionary.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl;
const BACKEND_DICTIONARY_URL = BACKEND_URL + '/pons/dict';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  private dicts: Dictionary[] = [];
  private fromLanguage: string;
  private toLanguage: string;

  constructor(private http: HttpClient) { }

  getDicts(): Dictionary[] {
    this.http.get<{ message: string, dictionaries: any }>(BACKEND_DICTIONARY_URL).subscribe((json) => {
      json.dictionaries.forEach(element => {
        const langFrom = element.languages[0];
        const dict: Dictionary = { languageFrom: '', languageTo: [{ to: '', key: '' }], translationKey: '' };

        const isDictInList = this.dicts.find(e => e.languageFrom === langFrom);

        if (!isDictInList) {
          dict.languageFrom = langFrom;
          json.dictionaries.forEach(language => {
            if (this.isSearchedLanguageFrom(language.languages[0], langFrom) &&
              this.isLanguageToKeyIsValid(language.key) && language.languages[1]) {
              dict.languageTo.push({ to: language.languages[1], key: language.key });
            } else if (language.languages[1] === langFrom && this.isLanguageToKeyIsValid(language.key) && language.languages[1]) {
              dict.languageTo.push({ to: language.languages[0], key: language.key });
            }
          });

          dict.languageTo = this.removeEmptyLanguageTo(dict);
          this.dicts.push(dict);
        }
      });
    });

    return this.dicts;
  }

  private isLanguageToKeyIsValid(key: string) {
    const keyLength = 4;
    return key.length === keyLength;
  }
  private isSearchedLanguageFrom(lang1: string, lang2: string): boolean {
    return lang1 === lang2;
  }

  private removeEmptyLanguageTo(dict: Dictionary) {
    return dict.languageTo.filter(e => e.to !== '');
  }

  setFromLanguage(from: string) {
    this.fromLanguage = from;
  }

  setToLanguage(to: string) {
    this.toLanguage = to;
  }

  getFromLanguage(): string {
    return this.fromLanguage;
  }

  getToLanguage(): string {
    return this.toLanguage;
  }

  getFromToLanguages(): string {
    if (this.toLanguage && this.fromLanguage) {
      return this.getDicts().find(x => x.languageFrom === this.fromLanguage).languageTo.find(x => x.to === this.toLanguage).key;
    } else {
      return '';
    }
  }
}
