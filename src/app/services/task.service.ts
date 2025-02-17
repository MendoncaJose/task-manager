import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  private statusFilter = new BehaviorSubject<string>('all');
  private categoryFilter = new BehaviorSubject<string>('all');
  private searchQuery = new BehaviorSubject<string>('');

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

  private persistTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  addTask(task: Omit<Task, 'id'>): void {
    const currentTasks = this.tasks.getValue();
    const newTask = {
      ...task,
      id: currentTasks.length
        ? Math.max(...currentTasks.map((t) => t.id)) + 1
        : 1,
    };
    const updatedTasks = [...currentTasks, newTask];
    this.tasks.next(updatedTasks);
    this.persistTasks(updatedTasks);
  }

  updateTask(task: Task): void {
    const currentTasks = this.tasks.getValue();
    const index = currentTasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      const updatedTasks = [...currentTasks];
      updatedTasks[index] = task;
      this.tasks.next(updatedTasks);
      this.persistTasks(updatedTasks);
    }
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
