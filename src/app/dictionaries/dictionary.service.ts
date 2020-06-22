import { Dictionary } from './dictionary.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  private dicts: Dictionary[] = [];
  private fromLanguage: string;
  private toLanguage: string;

  constructor(private http: HttpClient) { }

  // [
  //   {
  //     key: 'deel',
  //     simple_label: 'grecki «» niemiecki',
  //     directed_label: { elde: 'grecko » niemiecki', deel: 'niemiecko » grecki' },
  //     languages: ['el', 'de']
  //   },
  //   {
  //     key: 'deen',
  //     simple_label: 'angielski «» niemiecki',
  //     directed_label: { ende: 'angielsko » niemiecki', deen: 'niemiecko » angielski' },
  //     languages: ['en', 'de']
  //   },
  //   ...
  // ]
  getDicts(): Dictionary[] {
    this.http.get<{ message: string, dictionaries: any }>('http://localhost:3000/api/pons/dict').subscribe((json) => {
      json.dictionaries.forEach(element => {
        const langFrom = element.languages[0]; // el
        const dict: Dictionary = { languageFrom: '', languageTo: [{ to: '', key: '' }], translationKey: '' };

        const isDictInList = this.dicts.find(e => e.languageFrom === langFrom);

        if (!isDictInList) {
          dict.languageFrom = langFrom;
          json.dictionaries.forEach(language => {
            if (language.languages[0] === langFrom) {
              dict.languageTo.push({ to: language.languages[1], key: language.key });
            } else if (language.languages[1] === langFrom) {
              dict.languageTo.push({ to: language.languages[0], key: language.key });
            }
          });

          this.dicts.push(dict);
        }
      });
    });

    return this.dicts;
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

    return this.getDicts().find(x => x.languageFrom === this.fromLanguage).languageTo.find(x => x.to === this.toLanguage).key;
  }
}

