import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './task-list/task-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskListRoutingModule } from './task-routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import {
  TaskStatusColorDirective,
  TaskStatusPipe,
  TaskCategoryColorDirective,
} from '../pipes/task-status.pipe';

@NgModule({
  declarations: [
    TasksListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    TaskStatusPipe,
    TaskStatusColorDirective,
    TaskCategoryColorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TaskListRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    TasksListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    TaskStatusPipe,
    TaskStatusColorDirective,
    TaskCategoryColorDirective,
  ],
})
export class TaskModule {}
