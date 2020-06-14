import { Flashcard } from './flashcard.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  private flashcards: Flashcard[] = [];
  private flashcardsUpdated = new Subject<Flashcard[]>();


  getFlashcards() {
    return [...this.flashcards];
  }

  getFlashcardsUpdateListener() {
    return this.flashcardsUpdated.asObservable();
  }

  addFlashcard(title: string, content: string) {
    const flashcard: Flashcard = { title, content };
    this.flashcards.push(flashcard);
    this.flashcardsUpdated.next([...this.flashcards]);
  }
}
