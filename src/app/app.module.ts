import { TranslationsListComponent } from './translations/translations-list/translations-list.component';
import { DictionariesListComponent } from './dictionaries/dictionaries-list/dictionaries-list.component';
import { FlashcardCreateComponent } from './flashcards/flashcard-create/flashcard-create.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatCheckboxModule,
} from '@angular/material';

import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardCreateComponent,
    HeaderComponent,
    FlashcardListComponent,
    DictionariesListComponent,
    TranslationsListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
