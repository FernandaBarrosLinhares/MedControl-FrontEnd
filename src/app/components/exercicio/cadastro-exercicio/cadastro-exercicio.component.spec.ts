import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroExercicioComponent } from './cadastro-exercicio.component';

describe('CadastroExercicioComponent', () => {
  let component: CadastroExercicioComponent;
  let fixture: ComponentFixture<CadastroExercicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroExercicioComponent]
    });
    fixture = TestBed.createComponent(CadastroExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
