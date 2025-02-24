import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent {
  dateRange: FormGroup;
  @Output() dateRangeChanged = new EventEmitter<{
    start: Date | null;
    end: Date | null;
  }>();

  constructor(private fb: FormBuilder) {
    this.dateRange = this.fb.group({
      start: [null],
      end: [null],
    });

    this.dateRange.valueChanges.subscribe((range) => {
      this.dateRangeChanged.emit(range);
    });
  }
}
