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

  constructor(public translationService: TranslationService) { }

  ngOnInit() {
    console.log('test');
    // this.translations = this.translationService.getTranslations();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userInput = form.value.input;
    console.log("User input: " + this.userInput);
    this.translations = this.translationService.postTranslations(form.value.input);
    form.resetForm();
  }
}
