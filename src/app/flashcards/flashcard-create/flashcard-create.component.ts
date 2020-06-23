import { FlashcardsService } from './../flashcard.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flashcard-create',
  templateUrl: './flashcard-create.component.html',
  styleUrls: ['./flashcard-create.component.css']
})
export class FlashcardCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public flashcardsService: FlashcardsService, private snackBar: MatSnackBar) { }

  onAddFlashcard(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.flashcardsService.addFlashcard(form.value.title, form.value.content, '');
    form.resetForm();
    this.snackBar.open('Flashcard created!', 'Close', {
      duration: 2000,
      panelClass: 'snackBar'
    });
  }
}


