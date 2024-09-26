import { DatePipe } from '@angular/common';
import { Component, output } from '@angular/core';
import { max } from 'rxjs';

@Component({
  selector: 'app-date-controls',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './date-controls.component.html',
  styleUrl: './date-controls.component.css',
})
export class DateControlsComponent {
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  maxDate: Date = new Date();
  dateChange = output<Date>();

  navigateToPreviousDate() {
    this.updateDate(-1);
  }

  navigateToNextDate() {
    if (this.currentDate < this.maxDate) {
      this.updateDate(1);
    }
  }

  updateDate(days: number) {
    const newDate = new Date(this.currentDate);
    newDate.setDate(this.currentDate.getDate() + days);
    this.currentDate = newDate;
    this.selectedDate = newDate;
    this.dateChange.emit(this.currentDate);
  }

  changeDiaryDate() {}
}
