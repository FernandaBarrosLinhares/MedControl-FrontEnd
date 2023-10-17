import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroExameComponent } from './cadastro-exame.component';

describe('CadastroExameComponent', () => {
  let component: CadastroExameComponent;
  let fixture: ComponentFixture<CadastroExameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroExameComponent]
    });
    fixture = TestBed.createComponent(CadastroExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
