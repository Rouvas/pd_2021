import { TestBed } from '@angular/core/testing';

import { BureauGuard } from './bureau.guard';

describe('BureauGuard', () => {
  let guard: BureauGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BureauGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
