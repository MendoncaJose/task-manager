import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['pending', Validators.required],
      category: ['work', Validators.required],
    });
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.params['id'];
    if (taskId) {
      this.isEditMode = true;
      const task = this.taskService.getTaskById(Number(taskId));
      if (task) {
        this.taskForm.patchValue(task);
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        creationDate: new Date(),
      };

      if (this.isEditMode) {
        const taskId = this.route.snapshot.params['id'];
        this.taskService.updateTask({ ...taskData, id: Number(taskId) });
      } else {
        this.taskService.addTask(taskData);
      }

      this.router.navigate(['/tasks']);
    }
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
