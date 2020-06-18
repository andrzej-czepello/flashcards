import { Translation } from './../translation.model';
import { OnInit, Component } from '@angular/core';
import { TranslationService } from '../translations.service';

@Component({
  selector: 'app-translations-list',
  templateUrl: './translations-list.component.html',
  // styleUrls: ['./translations-list.component.css']
})

export class TranslationsListComponent implements OnInit {
  translations: Translation[] = [];

  constructor(public translationService: TranslationService) { }

  ngOnInit() {
    console.log('test');
    this.translations = this.translationService.getTranslations();
  }
}
