import { Component, inject, OnInit } from '@angular/core';
import { MicronutrientsService } from '../micronutrients.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateMicronutrient } from '../micronutrient.model';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-new-micronutrient',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './new-micronutrient.component.html',
  styleUrl: './new-micronutrient.component.css',
})
export class NewMicronutrientComponent implements OnInit {
  private micronutrientsService = inject(MicronutrientsService);
  private formBuilder = inject(FormBuilder);
  micronutrientForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.micronutrientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dailyRecomendedIntakeMg: [0, [Validators.required, Validators.min(0)]],
      dailyIntakeLimitMg: [0],
    });
  }

  onSubmit() {
    const formValues = this.micronutrientForm.value;

    const newMicronutrient: CreateMicronutrient = {
      ...formValues,
    };

    this.micronutrientsService.add(newMicronutrient).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Error while adding supplement', error);
      },
    });
  }
}
