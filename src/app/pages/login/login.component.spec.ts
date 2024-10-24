import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../core/services/login.service';
import { LoginComponent } from './login.component';

const mockToastrService = {
  success: jasmine.createSpy('success'),
  warning: jasmine.createSpy('warning'),
};

const mockLoginService = {
  setUser: jasmine.createSpy('setUser'),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        FormBuilder,
        { provide: ToastrService, useValue: mockToastrService },
        { provide: LoginService, useValue: mockLoginService },

        provideRouter([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should set the user and navigate on successful login', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: '123',
    });

    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({ email: 'test@example.com', password: '123' })
    );

    component.onSubmit();

    expect(mockLoginService.setUser).toHaveBeenCalledWith('test@example.com');

    expect(mockToastrService.success).toHaveBeenCalledWith(
      `User test@example.com Logged`,
      'User Logged'
    );
  });
  it('should warn on invalid credentials', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({ email: 'test@example.com', password: '123' })
    );

    component.onSubmit();

    expect(mockToastrService.warning).toHaveBeenCalledWith(
      'User not found. Please verify your credentials or create an acount',
      'Invalid Credentials'
    );
  });
});
