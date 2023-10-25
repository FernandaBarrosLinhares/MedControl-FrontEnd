import { Component } from '@angular/core';
import IConsulta from 'src/app/interfaces/IConsulta';
import { IDieta } from 'src/app/interfaces/IDieta';
import IExame from 'src/app/interfaces/IExame';
import { IExercicio } from 'src/app/interfaces/IExercicio';
import IMedicamentos from 'src/app/interfaces/IMedicamentos';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { DietaService } from 'src/app/services/dieta/dieta.service';
import { ExameService } from 'src/app/services/exame.service';
import { ExercicioService } from 'src/app/services/exercicio.service';
import { MedicamentosService } from 'src/app/services/medicamento/medicamentos.service';



@Component({
  selector: 'app-prontuario-paciente',
  templateUrl: './prontuario-paciente.component.html',
  styleUrls: ['./prontuario-paciente.component.css']
})
export class ProntuarioPacienteComponent implements OnInit {
  paciente: any = {};
  consultas: IConsulta[] = [];
  exames: IExame[] = [];
  medicamentos: IMedicamentos[] = [];
  dietas: IDieta[] = [];
  exercicios: IExercicio[] = [];
  pacienteId = 0;

  constructor(private consultaService: ConsultaService, private exameService: ExameService, private medicamentoService: MedicamentosService, private dietaservice: DietaService, private exercicioService: ExercicioService) {

  }


  async ngOnInit() {
    this.consultas = await this.consultaService.buscarPorId(this.pacienteId);
    this.exames = await this.exameService.buscarPorId(this.pacienteId);
    this.medicamentos = await this.medicamentoService.buscarPorId(this.pacienteId);
    this.dietas = await this.dietaservice.buscarDietaId(this.pacienteId);
    this.exercicios = await this.exercicioService.buscarPorId(this.pacienteId);
