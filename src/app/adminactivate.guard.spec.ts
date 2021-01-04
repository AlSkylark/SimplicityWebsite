import { TestBed } from '@angular/core/testing';

import { AdminactivateGuard } from './adminactivate.guard';

describe('AdminactivateGuard', () => {
  let guard: AdminactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
