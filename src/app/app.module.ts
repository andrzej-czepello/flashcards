import { FlashcardModuleComponent } from './flashcards-module/flashcard-module.component';
import { SearchModuleComponent } from './search-module/search-module.component';
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
  MatSnackBarModule
} from '@angular/material';

import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FlashcardListComponent } from './flashcards/flashcard-list/flashcard-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardCreateComponent,
    HeaderComponent,
    FlashcardListComponent,
    DictionariesListComponent,
    TranslationsListComponent,
    SearchModuleComponent,
    FlashcardModuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
