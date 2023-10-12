import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DietaService } from 'src/app/services/dieta.service';

@Component({
  selector: 'app-cadastro-dieta',
  templateUrl: './cadastro-dieta.component.html',
  styleUrls: ['./cadastro-dieta.component.css'],
})
export class CadastroDietaComponent implements AfterViewInit {
  formDieta: any = FormGroup;
  pacientes = [{ id: 1, nome: 'Test' }];

  constructor(
    private service: DietaService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formDieta = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ]),
      ],
      data: [new Date(), Validators.required],
      horario: [new Date(), Validators.required],
      tipo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
        ]),
      ],
      descricao: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ]),
      ],
      status: [true, [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  cadastrarDieta() {
    if (this.formDieta.valid) {
      alert('Novo dieta cadastrada!');
      this.service.cadastrarDieta(this.formDieta.value);
    }
  }

  editarDieta() {}

  deletarDieta() {}
}
