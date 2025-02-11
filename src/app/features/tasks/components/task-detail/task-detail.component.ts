import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { RouterLink } from '@angular/router';
import { NgClass, DatePipe, NgIf } from '@angular/common';
import { TaskStatusPipe } from '../pipes/task-status.pipe';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass, DatePipe, NgIf, TaskStatusPipe],
})
export class TaskDetailComponent implements OnInit {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.task = this.taskService.getTaskById(id);

    if (!this.task) {
      this.router.navigate(['/tasks']);
    }
  }

  deleteTask(): void {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id);
      this.router.navigate(['/tasks']);
    }
  }
}
