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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userInput = form.value.input;
    console.log('User input: ' + this.userInput);
    this.languagesFromTo = this.dictionaryService.getFromToLanguages();
    this.translations = this.translationService.postTranslations(this.userInput, this.languagesFromTo);
    this.translation = form.value.translation;
    console.log('[Translation component] translation1: ' + this.translation);
    form.resetForm();
  }

  createFlashcards() {
    this.translations.forEach(translation => {
      if (translation.isChecked) {
        this.flashcardService.addFlashcard(translation.suggestedWord, translation.translation);
      }
    });
  }
}
