import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Test Task',
      description: 'This is a test task',
      creationDate: new Date(),
      status: 'pending',
      category: 'work',
    },
  ]);
  private statusFilter = new BehaviorSubject<string>('all');
  private categoryFilter = new BehaviorSubject<string>('all');
  private searchQuery = new BehaviorSubject<string>('');

  getFilteredTasks(): Observable<Task[]> {
    return combineLatest([
      this.tasks,
      this.statusFilter,
      this.categoryFilter,
      this.searchQuery,
    ]).pipe(
      map(([tasks, status, category, search]) => {
        return tasks.filter((task) => {
          const matchesStatus = status === 'all' || task.status === status;
          const matchesCategory =
            category === 'all' || task.category === category;
          const matchesSearch =
            search === '' ||
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase());

          return matchesStatus && matchesCategory && matchesSearch;
        });
      })
    );
  }

  setStatusFilter(status: string): void {
    this.statusFilter.next(status);
  }

  setCategoryFilter(category: string): void {
    this.categoryFilter.next(category);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  addTask(task: Omit<Task, 'id'>): void {
    const currentTasks = this.tasks.getValue();
    const newTask = {
      ...task,
      id: currentTasks.length
        ? Math.max(...currentTasks.map((t) => t.id)) + 1
        : 1,
    };
    this.tasks.next([...currentTasks, newTask]);
  }

  updateTask(task: Task): void {
    const currentTasks = this.tasks.getValue();
    const index = currentTasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      currentTasks[index] = task;
      this.tasks.next([...currentTasks]);
    }
  }

  deleteTask(id: number): void {
    const currentTasks = this.tasks.getValue();
    this.tasks.next(currentTasks.filter((task) => task.id !== id));
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.getValue().find((task) => task.id === id);
  }
}
