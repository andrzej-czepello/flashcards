import { Flashcard } from './../flashcard.model';
import { FlashcardsService } from './../flashcard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-flashcard-list',
  templateUrl: './flashcard-list.component.html'
})

export class FlashcardListComponent implements OnInit, OnDestroy {
  flashcards: Flashcard[] = [];
  private flashcardsSub: Subscription;

  constructor(public flashcardsService: FlashcardsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.flashcardsService.getFlashcards();
    this.flashcardsService.getFlashcardsUpdateListener().subscribe((flashcards: Flashcard[]) => {
      this.flashcards = flashcards;
    });
  }

  onDelete(flashcardId: string) {
    this.flashcardsService.deleteFlashcard(flashcardId);
    this.snackBar.open('Flashcard deleted!', 'Close', {
      duration: 2000,
      panelClass: 'mat-primary'
    });
  }

  // onEdit(flashcardId: string, flashcardToEdit: Flashcard) {
  //   this.flashcardsService.editFlashcard(flashcardId, flashcardToEdit);
  // }

  ngOnDestroy() {
    // this.flashcardsSub.unsubscribe();
  }
}
