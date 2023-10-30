import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuarioPacienteComponent } from './prontuario-paciente.component';

describe('ProntuarioPacienteComponent', () => {
  let component: ProntuarioPacienteComponent;
  let fixture: ComponentFixture<ProntuarioPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProntuarioPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProntuarioPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
