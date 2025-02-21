import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';
import { signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  private statusFilter = new BehaviorSubject<string>('all');
  private categoryFilter = new BehaviorSubject<string>('all');
  private searchQuery = new BehaviorSubject<string>('');

  private tasksSignal = signal<Task[]>([]);
  public isEmpty = computed(() => this.tasksSignal().length === 0);

  private readonly STORAGE_KEY = 'tasks';

  constructor() {
    const savedTasks = localStorage.getItem(this.STORAGE_KEY);
    if (savedTasks) {
      this.tasks.next(JSON.parse(savedTasks));
    }
  }
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
          const matchesSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());
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

  private persistTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  addTask(task: Omit<Task, 'id'>): void {
    const currentTasks = this.tasksSignal();
    const newTask = {
      ...task,
      id: currentTasks.length
        ? Math.max(...currentTasks.map((t) => t.id)) + 1
        : 1,
    };
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
    this.persistTasks(this.tasksSignal());
  }

  private sanitizeInput(input: string): string {
    // Remove SQL injection patterns
    return input
      .replace(/['";]/g, '')
      .replace(/(\b(select|insert|update|delete|drop|union|exec)\b)/gi, '');
  }

  updateTask(task: Task): void {
    const sanitizedTask = {
      ...task,
      title: this.sanitizeInput(task.title),
      description: this.sanitizeInput(task.description),
    };

    // Validate task
    if (!this.isValidTask(sanitizedTask)) {
      console.error('Invalid task data');
      return;
    }

    const currentTasks = this.tasks.getValue();
    const index = currentTasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      const updatedTasks = [...currentTasks];
      updatedTasks[index] = sanitizedTask;
      this.tasks.next(updatedTasks);
      this.persistTasks(updatedTasks);
    }
  }

  private isValidTask(task: Task): boolean {
    return (
      task.title.length > 0 &&
      task.title.length <= 100 &&
      task.description.length <= 1000 &&
      ['pending', 'in-progress', 'completed'].includes(task.status) &&
      ['work', 'personal'].includes(task.category)
    );
  }

  deleteTask(id: number): void {
    const currentTasks = this.tasks.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    this.tasks.next(updatedTasks);
    this.persistTasks(updatedTasks);
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.getValue().find((task) => task.id === id);
  }
}
