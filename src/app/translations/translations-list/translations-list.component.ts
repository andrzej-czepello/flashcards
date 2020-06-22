import { FlashcardsService } from './../../flashcards/flashcard.service';
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
  translation: string;
  languagesFromTo: string;
  checkedTranslations: Translation[] = [];
  isChecked: boolean;

  constructor(private translationService: TranslationService,
    private dictionaryService: DictionaryService,
    private flashcardService: FlashcardsService) { }

  ngOnInit() {
  }

  onSearchButton(form: NgForm) {
    this.translations.length = 0;
    if (form.invalid) {
      return;
    }
    this.userInput = form.value.input;
    console.log('User input: ' + this.userInput);
    this.languagesFromTo = this.dictionaryService.getFromToLanguages();
    this.translationService.postTranslations(this.userInput, this.languagesFromTo).subscribe(translations => {
      this.translation = form.value;
      this.translations = translations;
    });

    form.resetForm();
  }

  onCreateFlashcardsButton(form: NgForm) {
    this.translations.forEach(translation => {
      if (translation.isChecked) {
        this.flashcardService.addFlashcard(translation.suggestedWord, translation.translation);
      }
    });
  }
}
