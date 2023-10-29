import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import IExame from 'src/app/interfaces/IExame';
import { ExameService } from 'src/app/services/exame/exame.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-cadastro-exame',
  templateUrl: './cadastro-exame.component.html',
  styleUrls: ['./cadastro-exame.component.css'],
})
export class CadastroExameComponent implements OnInit {
  formExame: any = FormGroup;
  pacientes: any = [];
  exameId: number = 0;
  exame: any;

  constructor(
    private fb: FormBuilder,
    private service: ExameService,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
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
      data: ['', [Validators.required, Validators.maxLength(10)]],
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

  async ngOnInit() {
    this.pacientes = await this.pacienteService.buscarPacientes();
    const params = await firstValueFrom(this.route.queryParams);

    if (params['id'] !== undefined) {
      this.exameId = Number(params['id']);

      this.exame = await this.service.buscarPorId(this.exameId);
      if (this.exame == null) {
        this.exameId = 0;
        this.router.navigate(['/labmedication']);
        return;
      }

      this.formExame.setValue({
        nome: this.exame.nome,
        data: this.convertBdDateToInputDate(this.exame.data),
        horario: this.exame.horario,
        tipo: this.exame.tipo,
        laboratorio: this.exame.laboratorio,
        urlDocumento: this.exame.url_documento,
        resultado: this.exame.resultado,
        status: this.exame.status,
        paciente: this.exame.paciente.id,
      });
      this.formExame.get('paciente').disable();
    } else {
      this.formExame.get('status').disable();
    }
  }

  async onSubmit() {
    let data = this.formExame.get('data').value;

    let exame: IExame = {
      nome: this.formExame.get('nome')?.value,
      data: this.convertInputDateToBdDate(data),
      horario: this.formExame.get('horario')?.value,
      tipo: this.formExame.get('tipo')?.value,
      laboratorio: this.formExame.get('laboratorio')?.value,
      url_documento: this.formExame.get('urlDocumento')?.value,
      resultado: this.formExame.get('resultado')?.value,
      status: this.formExame.get('status')?.value,
      paciente: {
        id: this.formExame.get('paciente')?.value,
      },
    };
    if (this.exameId) {
      exame.id = this.exameId;
      await this.service.editar(exame);
      this.router.navigate(['labmedication', 'prontuarios', 'paciente'], {
        queryParams: { id: exame.paciente.id },
      });
    } else {
      await this.service.salvar(exame);
      this.router.navigate(['labmedication']);
    }
  }

  deletar() {
    this.service.excluir(this.exameId);
    this.router.navigate(['/labmedication']);
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
