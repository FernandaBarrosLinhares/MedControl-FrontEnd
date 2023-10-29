import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { enfermeiroGuard } from './enfermeiro.guard';

describe('enfermeiroGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => enfermeiroGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
