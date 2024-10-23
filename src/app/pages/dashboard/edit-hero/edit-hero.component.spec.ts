import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UppercaseDirective } from '../../../shared/uppercase.directive';
import EditHeroComponent from './edit-hero.component';
import { Hero } from '../../../shared/interface/hero';
import { HeroesService } from '../../../shared/service/heroes.service';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockToastrService = {
  success: jasmine.createSpy('success'),
  error: jasmine.createSpy('error'),
};

const mockHero: Hero = {
  id: 1,
  superhero: 'Spiderman',
  publisher: 'Marvel Comics',
  alter_ego: 'Peter Parker',
  first_appearance: '1962',
  characters: 'Peter Parker',
};

const mockHeroesService = {
  heroData: jasmine.createSpy('heroData').and.returnValue(mockHero),
  editHero: jasmine.createSpy('editHero'),
};

describe('EditHeroComponent', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditHeroComponent,
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
    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockToastrService.success.calls.reset();
    mockToastrService.error.calls.reset();
    mockRouter.navigate.calls.reset();
    mockHeroesService.editHero.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with hero data', () => {
    expect(component.heroForm.value).toEqual(mockHero);
  });

  it('should mark form as invalid if required fields are missing', () => {
    component.heroForm.patchValue({ superhero: '' }); 
    expect(component.heroForm.invalid).toBeTrue();
  });

  it('should call editHero service and navigate on valid form submission', () => {
    component.heroForm.setValue({
      id: '1',
      superhero: 'Ironman',
      publisher: 'Marvel Comics',
      alter_ego: 'Tony Stark',
      first_appearance: '1963',
      characters: 'Tony Stark',
    });

    component.onSubmit();

    expect(mockHeroesService.editHero).toHaveBeenCalledWith({
      id: '1',
      superhero: 'IRONMAN', 
      publisher: 'Marvel Comics',
      alter_ego: 'Tony Stark',
      first_appearance: '1963',
      characters: 'Tony Stark',
    });

    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Hero Ironman Updated',
      'Hero Updated'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an error if the form is invalid', () => {
    component.heroForm.patchValue({ superhero: '' });

    component.onSubmit();

    expect(mockToastrService.error).toHaveBeenCalledWith(
      'Verify that all fields are correct.',
      'Invalid Form'
    );
    expect(mockHeroesService.editHero).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
