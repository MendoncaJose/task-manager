import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss'],
})
export class InlineEditComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('editInput') editInput!: ElementRef;
  @Input() taskId?: number;

  isEditing = false;
  editValue: string = '';

  constructor(private router: Router) {}

  navigateToDetail(): void {
    if (this.taskId) {
      this.router.navigate(['/tasks', this.taskId]);
    }
  }
  toggleEdit(): void {
    if (this.isEditing) {
      this.saveEdit();
    } else {
      this.startEdit();
    }
  }

  startEdit(): void {
    this.editValue = this.value;
    this.isEditing = true;
    this.editInput?.nativeElement.focus();
  }

  saveEdit(): void {
    if (this.editValue.trim() !== '' && this.editValue !== this.value) {
      this.valueChange.emit(this.editValue);
    }
    this.isEditing = false;
  }
}
