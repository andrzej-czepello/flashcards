import { Component } from '@angular/core';
import { Flashcard } from './flashcards/flashcard.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedFlashcards: Flashcard[] = [];

  onFlashcardAdded(flashcard) {
    this.storedFlashcards.push(flashcard);
  }
}
