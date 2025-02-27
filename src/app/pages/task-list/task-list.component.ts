import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService
      .getFilteredTasks()
      .pipe(tap((tasks) => console.log('Tasks:', tasks)));
  }

  completeTask(task: Task): void {
    this.taskService.updateTask({
      ...task,
      status: 'completed',
    });
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
    }
  }

  filterByStatus(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.taskService.setStatusFilter(status);
  }

  filterByCategory(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    this.taskService.setCategoryFilter(category);
  }

  search(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.taskService.setSearchQuery(query);
  }

  updateTaskTitle(task: Task, newTitle: string): void {
    this.taskService.updateTask({
      ...task,
      title: newTitle,
    });
  }

  onDateRangeChanged(range: { start: Date | null; end: Date | null }): void {
    if (!range.start && !range.end) {
      this.tasks$ = this.taskService.getFilteredTasks();
      return;
    }

    this.tasks$ = this.taskService.getTasksByDateRange(range.start, range.end);
  }

  ngOnInit(): void {
    console.log('TaskListComponent initialized');
  }
}
