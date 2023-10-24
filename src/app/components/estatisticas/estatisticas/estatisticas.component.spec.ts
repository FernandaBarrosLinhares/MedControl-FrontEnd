import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasComponent } from './estatisticas.component';

describe('EstatisticasComponent', () => {
  let component: EstatisticasComponent;
  let fixture: ComponentFixture<EstatisticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstatisticasComponent]
    });
    fixture = TestBed.createComponent(EstatisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
