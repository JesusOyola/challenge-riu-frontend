import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterPathNames } from '../../enum/router-path-names';
import { User } from '../../core/auth/interface/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.registerForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    const userData: User = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };
    const userTransformData = JSON.stringify(userData);
    const userAlreadyCreate = localStorage.getItem(
      this.registerForm.get('email')?.value
    );

    if (this.registerForm.valid && userAlreadyCreate === null) {
      localStorage.setItem(
        `${this.registerForm.get('email')?.value}`,
        userTransformData
      );
      this.loginService.setUser(this.registerForm.get('email')?.value);
      localStorage.setItem(
        'token',
        `${this.registerForm.get('email')?.value}${
          this.registerForm.get('password')?.value
        }`
      );
      this.toastr.success(
        `User ${this.registerForm.controls['email'].value} created`,
        'User created'
      );
      this.registerForm.reset();
      this.router.navigate([`/${RouterPathNames.login}`]);
    }else {
      this.toastr.warning(
        `Verify that your email and password are correct.`,
        'Invalid Credentials'
      );
    }
  }

}
