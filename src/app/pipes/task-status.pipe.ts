import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return value;
    }
  }
}

@Directive({
  selector: '[appTaskStatusColor]',
})
export class TaskStatusColorDirective implements OnInit {
  @Input('appTaskStatusColor') status!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const colors: { [key: string]: string } = {
      pending: '#ff9800',
      completed: '#90ee90',
      'in-progress': '#87ceeb',
    };

    this.el.nativeElement.style.backgroundColor =
      colors[this.status.toLowerCase()] || '#ffffff';
  }
}

@Directive({
  selector: '[appTaskCategoryColor]',
})
export class TaskCategoryColorDirective implements OnInit {
  @Input('appTaskCategoryColor') category!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const colors: { [key: string]: string } = {
      work: '#ffe5b4',
      personal: '#e3d1f9',
    };

    this.el.nativeElement.style.backgroundColor =
      colors[this.category.toLowerCase()] || '#ffffff';
  }
}
