import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
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
import { FormsModule } from '@angular/forms';
import { InlineEditComponent } from '../components/inline-edit/inline-edit.component';

@NgModule({
  declarations: [
    TasksListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    TaskStatusPipe,
    TaskStatusColorDirective,
    TaskCategoryColorDirective,
    InlineEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TaskListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  exports: [
    TasksListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    TaskStatusPipe,
    TaskStatusColorDirective,
    TaskCategoryColorDirective,
    InlineEditComponent,
  ],
})
export class TaskModule {}
