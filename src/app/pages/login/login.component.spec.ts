import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../core/services/login.service';
import { RouterPathNames } from '../../enum/router-path-names'; // Ajusta la ruta si es necesario
import { provideRouter } from '@angular/router';

// Mocks
const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

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
      imports: [ReactiveFormsModule, LoginComponent], // Se importa el componente standalone
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: LoginService, useValue: mockLoginService },
        provideRouter([]), // Se provee el router si es necesario
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta los cambios en el DOM
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
    component.loginForm.setValue({ email: 'test@example.com', password: '123' });
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    component.onSubmit();

    expect(mockLoginService.setUser).toHaveBeenCalledWith('test@example.com');
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'User test@example.com created',
      'User created'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/${RouterPathNames.home}`]);
  });

  it('should warn on invalid credentials', () => {
    component.loginForm.setValue({ email: '', password: '' });

    component.onSubmit();

    expect(mockToastrService.warning).toHaveBeenCalledWith(
      'Verify that your email and password are correct.',
      'Invalid Credentials'
    );
  });
});

