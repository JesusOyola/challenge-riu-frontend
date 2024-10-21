import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import CreateHeroComponent from './create-hero.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UppercaseDirective } from '../../../shared/uppercase.directive';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockToastrService = {
  success: jasmine.createSpy('success'),
  error: jasmine.createSpy('error'),
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
