import { Flashcard } from './../flashcard.model';
import { FlashcardsService } from './../flashcard.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-flashcard-create',
  templateUrl: './flashcard-create.component.html',
  styleUrls: ['./flashcard-create.component.css']
})
export class FlashcardCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  flashcard: Flashcard;
  isLoading = false;
  private mode = 'create';
  private flashcardId: string;

  constructor(public flashcardsService: FlashcardsService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('flashcardId')) {
        this.mode = 'edit';
        this.flashcardId = paramMap.get('flashcardId');
        this.isLoading = true;
        this.flashcardsService.getFlashcard(this.flashcardId).subscribe(data => {
          this.isLoading = false;
          this.flashcard = {
            id: data._id,
            title: data.title,
            content: data.content,
            languageFrom: data.languageFrom,
            languageTo: data.languageTo
          };
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
    this.isLoading = true;
    if (this.mode === 'create') {
      this.flashcardsService.addFlashcard(form.value.title, form.value.content, form.value.languageFrom, form.value.languageTo);
      this.isLoading = false;
      this.snackBar.open('Flashcard created!', 'Close', {
        duration: 3000,
        panelClass: 'snackBar'
      });
    } else {
      this.flashcardsService.updateFlashcard(this.flashcardId, form.value.title, form.value.content,
        form.value.languageFrom, form.value.languageTo);
      this.isLoading = false;
      this.snackBar.open('Flashcard updated!', 'Close', {
        duration: 3000,
        panelClass: 'snackBar'
      });
      this.router.navigate(['/flashcards']);
    }
    form.resetForm();
  }
}
