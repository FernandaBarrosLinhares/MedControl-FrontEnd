import { TestBed } from '@angular/core/testing';

import { ExercicioService } from './exercicio.service';

describe('ExercicioService', () => {
  let service: ExercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
