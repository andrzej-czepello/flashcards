import { FlashcardsService } from './../../flashcards/flashcard.service';
import { DictionaryService } from 'src/app/dictionaries/dictionary.service';
import { Translation } from './../translation.model';
import { OnInit, Component } from '@angular/core';
import { TranslationService } from '../translations.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-translations-list',
  templateUrl: './translations-list.component.html',
  styleUrls: ['./translations-list.component.css']
})

export class TranslationsListComponent implements OnInit {
  translation: string;
  translations: Translation[] = [];
  userInput: string;
  languagesFromTo: string;
  languageFrom: string;
  languageTo: string;
  checkedTranslations: Translation[] = [];
  isChecked: boolean;
  isFirstTranslation: boolean;
  isLoading = false;

  constructor(private translationService: TranslationService, private dictionaryService: DictionaryService, private flashcardService: FlashcardsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isFirstTranslation = true;
  }

  onSearchButton(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userInput = form.value.input;
    this.languagesFromTo = this.dictionaryService.getFromToLanguages();
    this.languageFrom = this.dictionaryService.getFromLanguage(); //this.languagesFromTo.substring(0, 2);
    this.languageTo = this.dictionaryService.getToLanguage();
    if (this.languagesFromTo !== '') {
      this.isLoading = true;
      this.translationService.postTranslations(this.userInput, this.languagesFromTo).subscribe(translations => {
        this.isLoading = false;
        this.translation = form.value;
        this.translations = translations;
      });
      this.isFirstTranslation = false;
      form.resetForm();
    }
  }

  onCreateFlashcardsButton() {
    this.translations.forEach(translation => {
      if (translation.isChecked) {
        this.flashcardService.addFlashcard(translation.suggestedWord, translation.translation, translation.userInputToSearch);
      }
    });
    this.snackBar.open('Flashcard added!', 'Close', {
      duration: 3000,
      panelClass: 'mat-primary'
    });
  }

  hasNoTranslationsLanguageFrom(): boolean {
    return this.translations.filter(t => t.languageFrom === this.languageFrom).length === 0;
  }

  hasNoTranslationsLanguageTo(): boolean {
    return this.translations.filter(t => t.languageFrom === this.languageTo).length === 0;
  }
}
