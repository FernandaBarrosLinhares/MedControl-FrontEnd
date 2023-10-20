import { TestBed } from '@angular/core/testing';

import { DietaService } from './dieta.service';

describe('DietaService', () => {
  let service: DietaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
