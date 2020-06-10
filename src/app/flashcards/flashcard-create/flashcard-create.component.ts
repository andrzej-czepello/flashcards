import { Component } from '@angular/core';

@Component({
  selector: 'app-flashcard-create',
  templateUrl: './flashcard-create.component.html'
})
export class FlashcardCreateComponent {
  newFlashcard = '';
  onAddFlashcard(postInput: HTMLTextAreaElement) {

    this.newFlashcard = postInput.value;
  }
}
