import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import IConsulta from 'src/app/interfaces/IConsulta';
import IMedicamentos from 'src/app/interfaces/IMedicamentos';
import IPaciente from 'src/app/interfaces/IPaciente';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { MedicamentosService } from 'src/app/services/medicamento/medicamentos.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { UsuariosService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro-consulta',
  templateUrl: './cadastro-consulta.component.html',
  styleUrls: ['./cadastro-consulta.component.css'],
})
export class CadastroConsultaComponent implements OnInit {
  formConsulta: any = FormGroup;
  pacientes: IPaciente[] = [];
  usuarios: IUsuario[] = [];
  medicamentos: IMedicamentos[] = [];
  consultaId: number = 0;
  consulta: any;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private usuarioService: UsuariosService,
    private medicamentoService: MedicamentosService,
    private service: ConsultaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formConsulta = this.fb.group({
      motivo: [
        '',
        [
          Validators.required,
          Validators.maxLength(64),
          Validators.minLength(8),
        ],
      ],
      data: ['', [Validators.required, Validators.maxLength(10)]],
      horario: ['', [Validators.required]],
      descricao: [
        '',
        [
          Validators.required,
          Validators.maxLength(1024),
          Validators.minLength(16),
        ],
      ],
      dosagensPrecaucoes: [
        '',
        [
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(16),
        ],
      ],
      paciente: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      medicamento: ['', []],
      status: [true, [Validators.required]],
    });
  }

  async ngOnInit() {
    this.pacientes = (await this.pacienteService.buscarPacientes()) || [];
    this.usuarios = (await this.usuarioService.buscarUsuarios()) || [];
    this.medicamentos = (await this.medicamentoService.buscarTodos()) || [];

    const params = await firstValueFrom(this.route.queryParams);

    if (params['id'] !== undefined) {
      this.consultaId = Number(params['id']);

      this.consulta = await this.service.buscarPorId(this.consultaId);
      if (this.consulta == null) {
        this.consultaId = 0;
        this.router.navigate(['/labmedication']);
        return;
      }

      this.formConsulta.setValue({
        motivo: this.consulta.motivo,
        data: this.convertBdDateToInputDate(this.consulta.data),
        horario: this.consulta.horario,
        descricao: this.consulta.descricao,
        dosagensPrecaucoes: this.consulta.dosagensPrecaucoes,
        status: this.consulta.status,
        paciente: this.consulta.paciente.id,
        usuario: this.consulta.usuario.id,
        medicamento: this.consulta.medicamento.id,
      });
      this.formConsulta.get('paciente').disable();
      this.formConsulta.get('usuario').disable();
    } else {
      this.formConsulta.get('status').disable();
    }
  }

  async onSubmit() {
    let data = this.formConsulta.get('data').value;

    let consulta: IConsulta = {
      motivo: this.formConsulta.get('motivo')?.value,
      data: this.convertInputDateToBdDate(data),
      horario: this.formConsulta.get('horario')?.value,
      descricao: this.formConsulta.get('descricao')?.value,
      dosagensPrecaucoes: this.formConsulta.get('dosagensPrecaucoes')?.value,
      status: this.formConsulta.get('status')?.value,
      paciente: {
        id: this.formConsulta.get('paciente')?.value,
      },
      usuario: {
        id: this.formConsulta.get('usuario')?.value,
      },
      medicamento: {
        id: this.formConsulta.get('medicamento')?.value,
      },
    };
    if (this.consultaId) {
      await this.service.editar(consulta, this.consultaId);
      this.router.navigate(['labmedication', 'prontuarios', 'paciente'], {
        queryParams: { id: consulta.paciente.id },
      });
    } else {
      await this.service.salvar(consulta);
      this.router.navigate(['/labmedication']);
    }
  }

  async deletar() {
    await this.service.excluir(this.consultaId);
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
