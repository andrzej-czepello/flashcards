import { Flashcard } from './flashcard.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  private flashcards: Flashcard[] = [];
  private flashcardsUpdated = new Subject<Flashcard[]>();


  constructor(private http: HttpClient) { }

  getFlashcards() {
    this.http.get<{
      message: string, flashcards: Flashcard[]
    }>('http://localhost:3000/api/flashcards').subscribe(flashcardData => {
      this.flashcards = flashcardData.flashcards;
      this.flashcardsUpdated.next([...this.flashcards]);
    });
  }

  getFlashcardsUpdateListener() {
    return this.flashcardsUpdated.asObservable();
  }

  addFlashcard(title: string, content: string) {
    const flashcard: Flashcard = { id: null, title, content };
    this.http.post<{ message: string }>('http://localhost:3000/api/flashcards', flashcard).subscribe(responseData => {
      console.log(responseData.message);
      this.flashcards.push(flashcard);
      this.flashcardsUpdated.next([...this.flashcards]);
    });
  }
}
