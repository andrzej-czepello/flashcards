import { DictionaryService } from 'src/app/dictionaries/dictionary.service';
import { Translation } from './../translation.model';
import { OnInit, Component } from '@angular/core';
import { TranslationService } from '../translations.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-translations-list',
  templateUrl: './translations-list.component.html',
  // styleUrls: ['./translations-list.component.css']
})

export class TranslationsListComponent implements OnInit {
  translations: Translation[] = [];
  userInput: string;
  languagesFromTo: string;

  constructor(public translationService: TranslationService, public dictionaryService: DictionaryService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userInput = form.value.input;
    console.log('User input: ' + this.userInput);
    this.languagesFromTo = this.dictionaryService.getFromToLanguages();
    this.translations = this.translationService.postTranslations(this.userInput, this.languagesFromTo);
    form.resetForm();
  }
}
