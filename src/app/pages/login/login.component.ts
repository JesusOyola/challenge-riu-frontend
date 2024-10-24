import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/auth/interface/user';
import { LoginService } from '../../core/services/login.service';
import { RouterPathNames } from '../../enum/router-path-names';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);
  toastr = inject(ToastrService);

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
    const userAlreadyCreate = localStorage.getItem(
      this.loginForm.get('email')?.value
    );
    let user: User = {
      email: '',
      password: 0,
    };
    if (userAlreadyCreate) {
      user = JSON.parse(userAlreadyCreate);
      console.log(user);
    } else {
      console.log('No user found in localStorage for the given email.');
    }

    if (
      !this.loginForm.invalid &&
      this.loginForm.get('email')?.value === user.email &&
      this.loginForm.get('password')?.value === user.password
    ) {
      this.loginService.setUser(this.loginForm.get('email')?.value);
      this.toastr.success(
        `User ${this.loginForm.controls['email'].value} Logged`,
        'User Logged'
      );

      this.router.navigate([`/${RouterPathNames.home}`]);
    } else {
      this.toastr.warning(
        `User not found. Please verify your credentials or create an acount`,
        'Invalid Credentials'
      );
    }
  }
}
