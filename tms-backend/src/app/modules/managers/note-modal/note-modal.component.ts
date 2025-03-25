// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-note-modal',
//   templateUrl: './note-modal.component.html',
//   styleUrls: ['./note-modal.component.css']
// })
// export class NoteModalComponent {
//   @Input() isOpen = false;  // Controls modal visibility
//   @Input() title = 'Modal Title';  // Custom modal title
//   @Input() confirmText = 'Confirm';  // Button text
//   @Output() Close = new EventEmitter<void>();  // Emits when modal closes
//   @Output() Confirm = new EventEmitter<string>();  // Emits when confirmed

//   public noteText = '';  // Stores input text

//   closeModal(): void {
//     this.isOpen = false;
//     this.Close.emit();
//   }

//   confirmAction(): void {
//     if (this.noteText.trim()) {
//       this.Confirm.emit(this.noteText);  // Emit note text when confirmed
//       this.closeModal();
//     }
//   }
// }

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent {
  @Input() isOpen = false;  // Controls modal visibility
  @Input() title = 'Modal Title';  // Custom modal title
  @Input() confirmText = 'Confirm';  // Button text
  @Output() Close = new EventEmitter<void>();  // Emits when modal closes
  @Output() Confirm = new EventEmitter<string>();  // Emits when confirmed

  noteText = '';  // Stores input text

  closeModal(): void {
    this.isOpen = false;
    this.Close.emit();
  }

  confirmAction(): void {
    if (this.noteText.trim()) {
      this.Confirm.emit(this.noteText);  // Emit note text when confirmed
      this.closeModal();
    }
  }
}
