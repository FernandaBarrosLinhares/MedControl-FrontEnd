import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import IPaciente from 'src/app/interfaces/IPaciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
  styleUrls: ['./prontuarios.component.css']
})
export class ProntuariosComponent implements OnInit {
  pacientes: IPaciente[] | null = [];
  buscaForm: FormGroup;

  constructor(private fb: FormBuilder, private pacienteService: PacienteService) {
    this.buscaForm = this.fb.group({
      filtro: ['', []]
    })
  }

  async ngOnInit() {
    this.pacientes = await this.pacienteService.buscarPacientes();
  }

  async onSubmit() {
    if (this.buscaForm.get('filtro')?.value == '') return;
    this.pacientes = await this.pacienteService.buscarPacientesComFiltro(
      this.buscaForm.get('filtro')?.value
    );   
  }

  calcularIdade(paciente: IPaciente) {
    return this.pacienteService.calcularIdadePaciente(paciente);
  }

  exibirTelefone(telefone: string) {
    return this.pacienteService.converterTelefoneToView(telefone);
  }
}