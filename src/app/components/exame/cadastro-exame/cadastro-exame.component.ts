import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import IExame from 'src/app/interfaces/IExame';
import { ExameService } from 'src/app/services/exame.service';

@Component({
  selector: 'app-cadastro-exame',
  templateUrl: './cadastro-exame.component.html',
  styleUrls: ['./cadastro-exame.component.css'],
})
export class CadastroExameComponent implements AfterViewInit, OnInit {
  formExame: any = FormGroup;
  pacientes = [
    { id: 1, nome: 'Ana' },
    { id: 2, nome: 'Paula' },
    { id: 3, nome: 'Daniela' },
  ];
  temId: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ExameService,
    private rota: ActivatedRoute
  ) {
    this.formExame = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.maxLength(64),
          Validators.minLength(8),
        ],
      ],
      data: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      tipo: [
        '',
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(4),
        ],
      ],
      laboratorio: [
        '',
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(4),
        ],
      ],
      urlDocumento: ['', []],
      resultado: [
        '',
        [
          Validators.required,
          Validators.maxLength(1024),
          Validators.minLength(16),
        ],
      ],
      paciente: ['', [Validators.required]],
      status: [true, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  async ngAfterViewInit() {
    console.log(await this.service.buscarTodos());

    const checkbox: HTMLElement | null = document.getElementById('status');
    if (checkbox == null) return;
    checkbox.setAttribute('disabled', 'true');
  }

  async cadastrar() {
    let data = this.formExame.get('data').value;

    let exame: IExame = {
      nome: this.formExame.get('nome')?.value,
      data: this.convertInputDateToBdDate(data),
      horario: this.formExame.get('horario')?.value,
      tipo: this.formExame.get('tipo')?.value,
      laboratorio: this.formExame.get('laboratorio')?.value,
      urlDocumento: this.formExame.get('urlDocumento')?.value,
      resultado: this.formExame.get('resultado')?.value,
      status: this.formExame.get('status')?.value,
      paciente: {
        id: this.formExame.get('paciente')?.value,
      },
    };
    console.log(exame);
    await this.service.salvar(exame);
  }

  deletar() {
    // this.storagePacientes.deletarPaciente('PACIENTES', this.form.value);
    // this.formPaciente.resetForm();
    // this.mensagem = 'Paciente excluido';
    // this.formPaciente.disabled;
    // this.limparMensagens();
  }
  editar() {
    // this.form.enable();
  }

  convertInputDateToBdDate(data: string): string {
    let dataArray = data.split('-');
    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
  }

  convertBdDateToInputDate(data: string): string {
    let dataArray = data.split('/');
    return `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
  }
}
