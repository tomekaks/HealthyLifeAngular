import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private accountsService = inject(AccountsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  loginForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    const loginData: Login = {
      userName: this.loginForm.value['email'],
      password: this.loginForm.value['password'],
    };
    this.accountsService.loginUser(loginData).subscribe({
      next: (_) => {
        this.router.navigateByUrl('diary/food');
      },
      error: (error) => console.log(error),
    });
  }
}
