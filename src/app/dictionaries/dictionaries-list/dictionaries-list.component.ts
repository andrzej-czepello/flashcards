import { Dictionary } from '../dictionary.model';
import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'app-dictionaries-list',
  templateUrl: './dictionaries-list.component.html',
  styleUrls: ['./dictionaries-list.component.css']
})

export class DictionariesListComponent implements OnInit {
  dictionaries: Dictionary[] = [];
  fromLanguage = '';
  toLanguage = '';
  toLanguages: string[] = [];

  constructor(public dictionaryService: DictionaryService) { }

  ngOnInit() {
    this.dictionaries = this.dictionaryService.getDicts();
  }

  selectLanguageFromHandler(event: any) {
    this.fromLanguage = event.target.value;
    console.log(this.fromLanguage);

    if (this.fromLanguage !== '---') {
      this.toLanguages = this.dictionaries.find(x => x.languageFrom === this.fromLanguage).languageTo;
    }
  }

  selectLanguagesToHandler(event: any) {
    this.toLanguage = event.target.value;
  }
}


