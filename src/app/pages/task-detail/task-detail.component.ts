import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
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

  deleteTask(id: number): void {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.router.navigate(['/tasks']);
    }
  }

  completeTask(task: Task): void {
    this.taskService.updateTask({
      ...task,
      status: 'completed',
    });
    this.router.navigate(['/tasks']);
  }
}
