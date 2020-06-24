import { Flashcard } from './../flashcard.model';
import { FlashcardsService } from './../flashcard.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-flashcard-create',
  templateUrl: './flashcard-create.component.html',
  styleUrls: ['./flashcard-create.component.css']
})
export class FlashcardCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  flashcard: Flashcard;
  private mode = 'create';
  private flashcardId: string;

  constructor(public flashcardsService: FlashcardsService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('flashcardId')) {
        this.mode = 'edit';
        this.flashcardId = paramMap.get('flashcardId');
        this.flashcardsService.getFlashcard(this.flashcardId).subscribe(data => {
          this.flashcard = { id: data._id, title: data.title, content: data.content, userInput: '' };
        });
      } else {
        this.mode = 'create';
        this.flashcardId = null;
      }
    });
  }

  onSaveFlashcard(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.flashcardsService.addFlashcard(form.value.title, form.value.content, '');
      this.snackBar.open('Flashcard created!', 'Close', {
        duration: 3000,
        panelClass: 'snackBar'
      });
    } else {
      this.flashcardsService.updateFlashcard(this.flashcardId, form.value.title, form.value.content);
      this.snackBar.open('Flashcard updated!', 'Close', {
        duration: 3000,
        panelClass: 'snackBar'
      });
    }

    form.resetForm();

  }
}


