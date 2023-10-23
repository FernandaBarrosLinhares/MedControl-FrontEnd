import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDietaComponent } from './cadastro-dieta.component';

describe('CadastroDietaComponent', () => {
  let component: CadastroDietaComponent;
  let fixture: ComponentFixture<CadastroDietaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroDietaComponent]
    });
    fixture = TestBed.createComponent(CadastroDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
