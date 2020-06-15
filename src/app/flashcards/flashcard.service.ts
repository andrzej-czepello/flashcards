import { Flashcard } from './flashcard.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  private flashcards: Flashcard[] = [];
  private flashcardsUpdated = new Subject<Flashcard[]>();


  constructor(private http: HttpClient) { }

  getFlashcards() {
    this.http
      .get<{ message: string, flashcards: any }>(
        'http://localhost:3000/api/flashcards'
      )
      .pipe(map((flashcardData) => {
        return flashcardData.flashcards.map(flashcard => {
          return {
            title: flashcard.title,
            content: flashcard.content,
            id: flashcard._id
          };
        });
      }))
      .subscribe(transformedFlashcards => {
        this.flashcards = transformedFlashcards;
        this.flashcardsUpdated.next([...this.flashcards]);
      });
  }

  getFlashcardsUpdateListener() {
    return this.flashcardsUpdated.asObservable();
  }

  addFlashcard(title: string, content: string) {
    const flashcard: Flashcard = { id: null, title, content };
    this.http.post<{ message: string, flashcardId: string }>('http://localhost:3000/api/flashcards', flashcard).subscribe(responseData => {
      const id = responseData.flashcardId;
      flashcard.id = id;
      this.flashcards.push(flashcard);
      this.flashcardsUpdated.next([...this.flashcards]);
    });
  }

  deleteFlashcard(flashcardId: string) {
    this.http.delete('http://localhost:3000/api/flashcards/' + flashcardId).subscribe(() => {
      const updatedFlashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardId);
      this.flashcards = updatedFlashcards;
      this.flashcardsUpdated.next([...this.flashcards]);
    });
  }
}
