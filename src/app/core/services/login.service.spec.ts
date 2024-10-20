import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return an empty string initially', (done: DoneFn) => {
    service.getUser().subscribe((user) => {
      expect(user).toBe('');
      done();
    });
  });

  it('should update the user data', (done: DoneFn) => {
    const testUser = 'Superman';
    service.setUser(testUser);
    service.getUser().subscribe((user) => {
      expect(user).toBe(testUser);
      done();
    });
  });

  it('should allow multiple updates to user data', (done: DoneFn) => {
    const firstUser = 'Spiderman';
    const secondUser = 'Ironman';
    service.setUser(firstUser);
    service.setUser(secondUser);
    service.getUser().subscribe((user) => {
      expect(user).toBe(secondUser);
      done();
    });
  });
});
