import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';


const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: Router, useValue: mockRouter }], 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when redirectToHome is called', () => {
    component.redirectToHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']); 
  });

  it('should navigate to login when logOut is called', () => {
    component.logOut();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']); 
  });
});
