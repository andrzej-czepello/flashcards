import { Flashcard } from './../flashcard.model';
import { FlashcardsService } from './../flashcard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html'
})

export class FlashcardListComponent implements OnInit, OnDestroy {
  flashcards: Flashcard[] = [];
  private flashcardsSub: Subscription;

  constructor(public flashcardsService: FlashcardsService) { }

  ngOnInit() {
    this.flashcardsService.getFlashcards();
    this.flashcardsService.getFlashcardsUpdateListener().subscribe((flashcards: Flashcard[]) => {
      this.flashcards = flashcards;
    });
  }

  onDelete(flashcardId: string) {
    this.flashcardsService.deleteFlashcard(flashcardId);
  }

  ngOnDestroy() {
    this.flashcardsSub.unsubscribe();
  }
}
