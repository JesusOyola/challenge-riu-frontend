import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/auth/interface/user';
import { LoginService } from '../../core/services/login.service';
import { RouterPathNames } from '../../enum/router-path-names';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    const userData: User = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    const userTransformData = JSON.stringify(userData);
    const userAlreadyCreate = localStorage.getItem(
      this.loginForm.get('email')?.value
    );

    if (!this.loginForm.invalid && userAlreadyCreate === null) {
      localStorage.setItem(
        `${this.loginForm.get('email')?.value}`,
        userTransformData
      );
      this.loginService.setUser(this.loginForm.get('email')?.value);

      this.router.navigate([`/${RouterPathNames.home}`]);
    } else if (!this.loginForm.invalid && userAlreadyCreate !== null) {
      this.loginService.setUser(this.loginForm.get('email')?.value);

      this.router.navigate([`/${RouterPathNames.home}`]);
    }
  }
}
