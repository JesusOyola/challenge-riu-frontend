import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeComponent from './home.component';
import { ModalConfirmComponent } from '../../../shared/modal-confirm/modal-confirm.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesService } from '../../../shared/service/heroes.service';
import { of } from 'rxjs';
import { RouterPathNames } from '../../../enum/router-path-names';

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

const mockToastrService = {
  success: jasmine.createSpy('success'),
  error: jasmine.createSpy('error'),
};

const mockHeroesService = {
  getHeroes: jasmine.createSpy('getHeroes').and.returnValue(
    of([
      {
        id: 1,
        superhero: 'Superman',
        publisher: 'DC',
        alter_ego: 'Clark Kent',
        first_appearance: '1938',
        characters: 'Clark Kent',
      },
      {
        id: 2,
        superhero: 'Batman',
        publisher: 'DC',
        alter_ego: 'Bruce Wayne',
        first_appearance: '1939',
        characters: 'Bruce Wayne',
      },
    ])
  ),
  searchHeroesByName: jasmine
    .createSpy('searchHeroesByName')
    .and.callFake((name: string) => {
      return [
        {
          id: 1,
          superhero: 'Superman',
          publisher: 'DC',
          alter_ego: 'Clark Kent',
          first_appearance: '1938',
          characters: 'Clark Kent',
        },
      ];
    }),
  deleteHero: jasmine.createSpy('deleteHero'),
  heroData: {
    set: jasmine.createSpy('set'),
  },
};
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        MaterialModule,
        ModalConfirmComponent,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: HeroesService, useValue: mockHeroesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes on initialization', () => {
    component.ngAfterViewInit();
    expect(mockHeroesService.getHeroes).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should filter heroes based on input', () => {
    component.applyFilter({ target: { value: 'superman' } } as any);
    expect(mockHeroesService.searchHeroesByName).toHaveBeenCalledWith(
      'superman'
    );
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should navigate to create hero page', () => {
    component.redirectToCreateHero();
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      `/${RouterPathNames.createHero}`,
    ]);
  });

  it('should open confirmation dialog and delete hero', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.openDialog(1, 'Superman');
    expect(component.dialog.open).toHaveBeenCalled();
    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(mockHeroesService.deleteHero).toHaveBeenCalledWith(1);
      expect(mockToastrService.success).toHaveBeenCalledWith(
        'Hero Superman deleted',
        'Hero deleted'
      );
    });
  });
});
