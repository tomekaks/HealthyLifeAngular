import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

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

  navigateToPreviousDate() {}
  navigateToNextDate() {}
}
