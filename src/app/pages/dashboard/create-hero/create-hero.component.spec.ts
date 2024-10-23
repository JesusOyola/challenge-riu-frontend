import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import CreateHeroComponent from './create-hero.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UppercaseDirective } from '../../../shared/uppercase.directive';
import { HeroesService } from '../../../shared/service/heroes.service';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockToastrService = {
  success: jasmine.createSpy('success'),
  error: jasmine.createSpy('error'),
};
const mockHeroesService = {
  createHero: jasmine.createSpy('createHero'),
};

describe('CreateHeroComponent', () => {
  let component: CreateHeroComponent;
  let fixture: ComponentFixture<CreateHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateHeroComponent,
        MaterialModule,
        ReactiveFormsModule,
        UppercaseDirective,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: HeroesService, useValue: mockHeroesService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockToastrService.success.calls.reset();
    mockToastrService.error.calls.reset();
    mockRouter.navigate.calls.reset();
    mockHeroesService.createHero.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    const form = component.heroForm;
    expect(form).toBeTruthy();
    expect(form.controls['superhero'].value).toBe('');
    expect(form.controls['publisher'].value).toBe('');
  });

  it('should mark form as invalid if required fields are missing', () => {
    component.heroForm.setValue({
      id: '',
      superhero: '',
      publisher: '',
      alter_ego: '',
      first_appearance: '',
      characters: '',
    });
    expect(component.heroForm.invalid).toBeTrue();
  });

  it('should call createHero service and navigate on valid form submission', () => {
    component.heroForm.setValue({
      id: '1',
      superhero: 'Batman',
      publisher: 'DC Comics',
      alter_ego: 'Bruce Wayne',
      first_appearance: '1939',
      characters: 'Bruce Wayne',
    });

    component.onSubmit();

    expect(mockHeroesService.createHero).toHaveBeenCalledWith({
      id: '1',
      superhero: 'BATMAN',
      publisher: 'DC Comics',
      alter_ego: 'Bruce Wayne',
      first_appearance: '1939',
      characters: 'Bruce Wayne',
    });
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Hero Batman Created',
      'Hero Created'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an error if the form is invalid', () => {
    component.heroForm.patchValue({
      superhero: '',
      publisher: '',
      alter_ego: '',
      first_appearance: '',
      characters: '',
    });

    expect(component.heroForm.invalid).toBeTrue();

    component.onSubmit();

    const heroesService = TestBed.inject(HeroesService);
    expect(heroesService.createHero).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();

    expect(mockToastrService.error).toHaveBeenCalledWith(
      'Verify that all fields are correct.',
      'Invalid Form'
    );
  });
});
