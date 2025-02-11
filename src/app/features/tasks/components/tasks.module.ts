import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { TaskDetailComponent } from '../components/task-detail/task-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailComponent,
  ],
  exports: [TaskListComponent, TaskFormComponent, TaskDetailComponent],
})
export class TasksModule {}
