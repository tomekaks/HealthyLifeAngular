import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AccountsService } from '../accounts.service';
import { Register } from '../models/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private accountsService = inject(AccountsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  regiserForm: FormGroup = new FormGroup({});
  hide = true;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.regiserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
    this.regiserForm.controls['password'].valueChanges.subscribe({
      next: () =>
        this.regiserForm.controls['confirmPassword'].updateValueAndValidity(),
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    const newUser: Register = {
      email: this.regiserForm.value['email'],
      userName: '',
      password: this.regiserForm.value['password'],
    };
    this.accountsService.registerUser(newUser).subscribe({
      next: (_) => this.router.navigateByUrl('login'),
    });
  }
}
