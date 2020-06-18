import { Dictionary } from './dictionary.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  private dicts: Dictionary[] = [];

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
        const langFrom = element.languages[0]; // de

        const dict: Dictionary = { languageFrom: '', languageTo: [] };
        dict.languageFrom = langFrom;

        json.dictionaries.forEach(language => {
          if (language.languages[0] === langFrom) {
            dict.languageTo.push(language.languages[1]);
          }
        });

        this.dicts.push(dict);

        // console.log(JSON.stringify(this.dicts));

        // this.dicts.forEach(a => {
        //   console.log(JSON.stringify(a));

        // });
      });
    });

    return this.dicts;
  }
}

