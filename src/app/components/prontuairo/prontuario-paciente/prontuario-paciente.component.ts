import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../services/paciente/paciente.service';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import IConsulta from 'src/app/interfaces/IConsulta';
import IDieta from 'src/app/interfaces/IDieta';
import IExame from 'src/app/interfaces/IExame';
import { IExercicio } from 'src/app/interfaces/IExercicio';
import IMedicamentos from 'src/app/interfaces/IMedicamentos';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';
import { DietaService } from 'src/app/services/dieta/dieta.service';
import { MedicamentosService } from 'src/app/services/medicamento/medicamentos.service';
import { ExameService } from 'src/app/services/exame/exame.service';
import { ExercicioService } from 'src/app/services/exercicio/exercicio.service';
import { ProntuarioService } from 'src/app/services/prontuario/prontuario.service';
import IProntuario from 'src/app/interfaces/IProntuario';

@Component({
  selector: 'app-prontuario-paciente',
  templateUrl: './prontuario-paciente.component.html',
  styleUrls: ['./prontuario-paciente.component.css'],
})
export class ProntuarioPacienteComponent implements OnInit {
  paciente: any = {};
  prontuario: IProntuario;
  pacienteId = 0;

  constructor(
    private pacienteService: PacienteService,
    private prontuarioService: ProntuarioService,
    private rotaAtiva: ActivatedRoute,
    private router: Router
  ) {
    this.prontuario = {};
  }

  async ngOnInit() {
    const params = await firstValueFrom(this.rotaAtiva.queryParams);
    this.pacienteId = Number(params['id']);
    this.paciente = await this.pacienteService.buscarPacientePorId(
      this.pacienteId
    );
    [ this.prontuario ] = await this.prontuarioService.buscarProntuario(this.paciente.id, this.paciente.nomeCompleto);
    console.log(this.prontuario);
  }

  editarConsulta(id: number) {}
  editarDieta(id: number) {}
  editarExame(id: number) {}
  editarExercicio(id: number) {}
  editarMedicamento(id: number) {}
}
