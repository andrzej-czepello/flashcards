import { FlashcardModuleComponent } from './flashcards-module/flashcard-module.component';
import { SearchModuleComponent } from './search-module/search-module.component';
import { TranslationsListComponent } from './translations/translations-list/translations-list.component';
import { DictionariesListComponent } from './dictionaries/dictionaries-list/dictionaries-list.component';
import { FlashcardCreateComponent } from './flashcards/flashcard-create/flashcard-create.component';
import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'create', component: SearchModuleComponent },
  { path: 'flashcards', component: FlashcardModuleComponent },
  { path: 'edit/:flashcardId', component: FlashcardModuleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
