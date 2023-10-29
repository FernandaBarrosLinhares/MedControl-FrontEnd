import { ExercicioService } from '../../../services/exercicio/exercicio.service';
import { IExercicio } from './../../../interfaces/IExercicio';
import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-cadastro-exercicio',
  templateUrl: './cadastro-exercicio.component.html',
  styleUrls: ['./cadastro-exercicio.component.css'],
})
export class CadastroExercicioComponent implements OnInit {
  formExercicio: any = FormGroup;
  pacientes: any = [];
  exercicioId: number = 0;
  exercicio: any;

  constructor(
    private fb: FormBuilder,
    private service: ExercicioService,
    private pacienteService:PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formExercicio = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(5),
        ],
      ],
      data: ['', [Validators.required, Validators.maxLength(10)]],
      horario: ['', [Validators.required]],
      descricao: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.minLength(10),
        ],
      ],
      paciente: ['', [Validators.required]],
      tipoExercicioEnum: ['', [Validators.required]],
      status: [true, [Validators.required]],
      quantidadePorSemana: ['', [Validators.required]],
    });
  }

  deletar() {
    this.service.excluir(this.exercicioId);
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

  async onSubmit() {
    let data = this.formExercicio.get('data').value;

    let exercicio: IExercicio = {
      nome: this.formExercicio.get('nome')?.value,
      data: this.convertInputDateToBdDate(data),
      tipoExercicioEnum: this.formExercicio.get('tipoExercicioEnum')?.value,
      quantidadePorSemana: this.formExercicio.get('quantidadePorSemana').value,
      horario: this.formExercicio.get('horario')?.value,
      descricao: this.formExercicio.get('descricao')?.value,
      status: this.formExercicio.get('status')?.value,
      paciente: {
        id: this.formExercicio.get('paciente')?.value,
      },
    };
    if (this.exercicioId) {
      exercicio.id = this.exercicioId;
      await this.service.editar(exercicio,exercicio.id);
      this.router.navigate(['labmedication', 'prontuarios', 'paciente'], {
        queryParams: { id: exercicio.paciente.id },
      });
    } else {
      await this.service.salvar(exercicio);
      this.router.navigate(['labmedication']);
    }
  }

  async ngOnInit() {
    this.pacientes = await this.pacienteService.buscarPacientes();
    const params = await firstValueFrom(this.route.queryParams);

    if (params['id'] !== undefined) {
      this.exercicioId = Number(params['id']);

      this.exercicio = await this.service.buscarPorId(this.exercicioId);
      if (this.exercicio == null) {
        this.exercicioId = 0;
        this.router.navigate(['/labmedication']);
        return;
      }

      this.formExercicio.setValue({
        nome: this.exercicio.nome,
        data: this.convertBdDateToInputDate(this.exercicio.data),
        horario: this.exercicio.horario,
        tipoExercicioEnum: this.exercicio.tipoExercicioEnum,
        descricao: this.exercicio.descricao,
        quantidadePorSemana: this.exercicio.quantidadePorSemana,
        status: this.exercicio.status,
        paciente: this.exercicio.paciente.id,
      });
      this.formExercicio.get('paciente').disable();
    } else {
      this.formExercicio.get('status').disable();
    }
  }
}
