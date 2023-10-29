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
    [this.prontuario] = await this.prontuarioService.buscarProntuario(
      this.paciente.id,
      this.paciente.nomeCompleto
    );
  }

  editarConsulta(id: number) {
    this.editarRegistro('cadastro-consulta', id);
  }

  editarDieta(id: number) {
    this.editarRegistro('cadastro-dieta', id);
  }

  editarExame(id: number) {
    this.editarRegistro('cadastro-exame', id);
  }

  editarExercicio(id: number) {
    this.editarRegistro('cadastro-exercicio', id);
  }

  editarMedicamento(id: number) {
    this.editarRegistro('cadastro-medicamento', id);
  }

  editarRegistro(url: string, id: number) {
    this.router.navigate([`/labmedication/${url}`], {
      queryParams: { id: id },
    });
  }

  exibirTelefone(telefone: string) {
    return this.pacienteService.converterTelefoneToView(telefone);
  }

  exibirTipoDieta(tipo: string) {
    if (tipo === 'LOW') return 'Low carb';
    if (tipo === 'DASH') return 'Dash';
    if (tipo === 'PALEO') return 'Paleolítica';
    if (tipo === 'CETO') return 'Cetogênica';
    if (tipo === 'DUKAN') return 'Dukan';
    if (tipo === 'MEDITERRANEA') return 'Mediterrânea';
    return 'Outra';
  }

  exibirTipoExercicio(tipo: string) {
    if (tipo === 'RESISTENCIA_AEROBICA') return 'Resistência aeróbica';
    if (tipo === 'RESISTENCIA_MUSCULAR') return 'Resistência muscular';
    if (tipo === 'FLEXIBILIDADE') return 'Flexibilidade';
    if (tipo === 'FORCA') return 'Força';
    if (tipo === 'AGILIDADE') return 'Agilidade';
    return 'Outro';
  }

  exibirTipoMedicamento(tipo: string) {
    if (tipo === 'CAPSULA') return 'Cápsula';
    if (tipo === 'COMPRIMIDO') return 'Comprimido';
    if (tipo === 'LIQUIDO') return 'Líquido';
    if (tipo === 'CREME') return 'Creme';
    if (tipo === 'GEL') return 'Gel';
    if (tipo === 'INALACAO') return 'Inalação';
    if (tipo === 'INJECAO') return 'Injeção';
    return 'Spray';
  }

  exibirUnidadeMedicamento(unidade: string) {
    if (unidade === 'MG') return 'mg';
    if (unidade === 'MGC') return 'mgc';
    if (unidade === 'G') return 'g';
    if (unidade === 'ML') return 'ml';
    return '%';
  }
}
