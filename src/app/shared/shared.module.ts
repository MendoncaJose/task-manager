import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskStatusPipe } from '../features/tasks/components/pipes/task-status.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TaskStatusPipe],
  exports: [CommonModule, ReactiveFormsModule, RouterModule, TaskStatusPipe],
})
export class SharedModule {}
