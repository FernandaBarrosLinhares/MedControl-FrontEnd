import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMedicamentosComponent } from './cadastro-medicamentos.component';

describe('CadastroMedicamentosComponent', () => {
  let component: CadastroMedicamentosComponent;
  let fixture: ComponentFixture<CadastroMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroMedicamentosComponent]
    });
    fixture = TestBed.createComponent(CadastroMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
