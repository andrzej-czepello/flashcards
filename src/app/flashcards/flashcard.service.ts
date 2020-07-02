import { environment } from './../../environments/environment';
import { Flashcard } from './flashcard.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl;
const BACKEND_FLASHCARDS_URL = BACKEND_URL + '/flashcards/';

@Injectable({ providedIn: 'root' })
export class FlashcardsService {
  private flashcards: Flashcard[] = [];
  private flashcardsUpdated = new Subject<Flashcard[]>();

  constructor(private http: HttpClient) { }

  getFlashcards() {
    this.http
      .get<{ message: string, flashcards: any }>(BACKEND_FLASHCARDS_URL)
      .pipe(map((flashcardData) => {
        return flashcardData.flashcards.map(flashcard => {
          return {
            id: flashcard._id,
            title: flashcard.title,
            content: flashcard.content,
            userInput: flashcard.userInput,
            languageFrom: flashcard.languageFrom,
            languageTo: flashcard.languageTo,
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

  addFlashcard(title: string, content: string, languageFrom: string, languageTo: string) {
    const flashcard: Flashcard = { id: null, title, content, languageFrom, languageTo };
    this.http.post<{ message: string, flashcardId: string }>(BACKEND_FLASHCARDS_URL, flashcard).subscribe(responseData => {
      const id = responseData.flashcardId;
      flashcard.id = id;
      this.flashcards.push(flashcard);
      this.flashcardsUpdated.next([...this.flashcards]);
    });
  }

  updateFlashcard(id: string, title: string, content: string, languageFrom: string, languageTo: string) {
    const flashcard: Flashcard = { id, title, content, languageFrom, languageTo };
    this.http.put(BACKEND_FLASHCARDS_URL + id, flashcard).subscribe(response => {
      const updatedFlashcards = [...this.flashcards];
      this.flashcards = updatedFlashcards;
      this.flashcardsUpdated.next([...this.flashcards]);
    });
  }

  deleteFlashcard(flashcardId: string) {
    this.http.delete(BACKEND_FLASHCARDS_URL + flashcardId).subscribe(() => {
      const updatedFlashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardId);
      this.flashcards = updatedFlashcards;
      this.flashcardsUpdated.next([...this.flashcards]);
    });
  }

  getFlashcard(flashcardId: string) {
    return this.http.get<{ _id: string, title: string, content: string, languageFrom: string, languageTo: string }>(BACKEND_FLASHCARDS_URL + flashcardId);
  }
}
