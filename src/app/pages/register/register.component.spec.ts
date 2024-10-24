import { ComponentFixture, TestBed } from '@angular/core/testing';
import RegisterComponent from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../core/services/login.service';

const mockToastrService = {
  success: jasmine.createSpy('success'),
  warning: jasmine.createSpy('warning'),
};

const mockLoginService = {
  setUser: jasmine.createSpy('setUser'),
};
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, RouterLink],
      providers: [
        FormBuilder,

        { provide: ToastrService, useValue: mockToastrService },
        { provide: LoginService, useValue: mockLoginService },

        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.get('email')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
  });

  it('should successfully register a user', () => {
    component.registerForm.setValue({
      email: 'test@example.com',
      password: '123',
    });

    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.onSubmit();

    expect(mockLoginService.setUser).toHaveBeenCalledWith('test@example.com');

    expect(mockToastrService.success).toHaveBeenCalledWith(
      'User test@example.com created',
      'User created'
    );
  });

  it('should warn when trying to register an existing user', () => {
    component.registerForm.setValue({
      email: 'test@example.com',
      password: '123',
    });

    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({ email: 'test@example.com', password: '123' })
    );

    component.onSubmit();

    expect(mockToastrService.warning).toHaveBeenCalledWith(
      'Verify that your email and password are correct.',
      'Invalid Credentials'
    );
  });

  it('should warn when the form is invalid', () => {
    component.registerForm.setValue({
      email: '',
      password: '',
    });

    component.onSubmit();

    expect(mockToastrService.warning).toHaveBeenCalledWith(
      'Verify that your email and password are correct.',
      'Invalid Credentials'
    );
  });
});
