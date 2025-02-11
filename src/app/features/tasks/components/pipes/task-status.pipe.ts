import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus',
  standalone: true,
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'todo':
        return 'To Do';
      case 'in_progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return value;
    }
  }
}
