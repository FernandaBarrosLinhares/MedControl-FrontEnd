import { ExercicioService } from './../../../services/exercicio.service';
import { Component } from '@angular/core';
import IPaciente from 'src/app/interfaces/IPaciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent {

  isAdmin: boolean = true
  filtro: string = '';
  pacientes: IPaciente[] = [] 


  //TODO arrumar quando o endpoint de estatistica estiver pronto

  pacientesCadastrados: number = 45123;
  consultasRealizadas: number = 54423;
  exames: number = 54333;
  medicacoes: number = 3324;
  dietas: number = 3432;
  exercicios: number = 40234;


  constructor(private pacienteService: PacienteService, private exercicioService: ExercicioService) {}


  //TODO arrumar os campos que aparecerão na tela
  usuarios = [
    { nome: 'Isaque', telefone: '99123140', idade: '14 anos', convenio: 'Unimed' },
    { nome: 'Fernanda', telefone: '999337232', idade: '30 anos', convenio: 'Unimed' },
    { nome: 'Eduardo', telefone: '999927431', idade: '25 anos', convenio: 'Unimed' },
    { nome: 'Geovani', telefone: '987462936', idade: '27 anos', convenio: 'Unimed' },
    { nome: 'Isaque', telefone: '99123140', idade: '14 anos', convenio: 'Unimed' },
    { nome: 'Fernanda', telefone: '999337232', idade: '30 anos', convenio: 'Unimed' },
    { nome: 'Eduardo', telefone: '999927431', idade: '25 anos', convenio: 'Unimed' },
    { nome: 'Geovani', telefone: '987462936', idade: '27 anos', convenio: 'Unimed' },
    { nome: 'Isaque', telefone: '99123140', idade: '14 anos', convenio: 'Unimed' },
    { nome: 'Fernanda', telefone: '999337232', idade: '30 anos', convenio: 'Unimed' },
    { nome: 'Eduardo', telefone: '999927431', idade: '25 anos', convenio: 'Unimed' },
    { nome: 'Geovani', telefone: '987462936', idade: '27 anos', convenio: 'Unimed' },
  ]
  
  ngOnInit() {
    this.buscarTodosPacientes()
  }

  async buscarPacientes() {
    if(this.filtro != '') {
      try {
        this.pacientes = await this.pacienteService.buscarPacienteComFiltro(this.filtro);
      } catch (error) {
        console.error(error);
      }
    }
  }

  //TODO buscar do service de paciente quando corrigido
  async buscarTodosPacientes() {
    try {
      this.pacientes = await this.exercicioService.buscarTodosPacientes();
    } catch (error) {
      console.error(error);
    }
  }

  //TODO terminar quando tiver o service de Usuário
  buscarTodosUsuarios() {}
  buscarUsuarios() {}
}