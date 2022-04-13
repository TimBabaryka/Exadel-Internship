import { TestBed } from '@angular/core/testing';

import { AthGuardGuard } from './ath-guard.guard';

describe('AthGuardGuard', () => {
  let guard: AthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
