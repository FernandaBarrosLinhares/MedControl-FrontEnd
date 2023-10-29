import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import IEstatistica from 'src/app/interfaces/IEstatistica';
import IPaciente from 'src/app/interfaces/IPaciente';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { EstatisticaService } from 'src/app/services/estatisticas/estatistica.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { UsuariosService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css'],
})
export class EstatisticasComponent {
  isAdmin: boolean = false;
  pacientes: IPaciente[] = [];
  usuarios: IUsuario[] = [];
  formUsuario: FormGroup;
  formPaciente: FormGroup;
  estatisticas: IEstatistica = {
    numPacientes: 0,
    numExames: 0,
    numExercicios: 0,
    numConsultas: 0,
    numMedicamentos: 0,
    numDietas: 0,
  };

  constructor(
    private pacienteService: PacienteService,
    private usuarioService: UsuariosService,
    private loginService: LoginService,
    private estatisticaService: EstatisticaService,
    private fb: FormBuilder
  ) {
    this.formUsuario = this.fb.group({
      filtro: ['', []],
    });
    this.formPaciente = this.fb.group({
      filtro: ['', []],
    });
    this.isAdmin =
      this.loginService.obterTipoUsuarioLogado() == 'ADMINISTRADOR';
  }

  async ngOnInit() {
    await this.buscarTodosPacientes();
    if(this.loginService.obterTipoUsuarioLogado() != "ENFERMEIRO" ){
      await this.buscarTodosUsuarios();
    }
    this.estatisticas = await this.estatisticaService.buscarEstatisticas();
  }

  async buscarTodosUsuarios() {
    const usuarios = await this.usuarioService.buscarUsuarios();
    if (usuarios == null) return;
    this.usuarios = usuarios;
  }

  async buscarTodosPacientes() {
    const pacientes = await this.pacienteService.buscarPacientes();
    if (pacientes == null) return;
    this.pacientes = pacientes;
  }

  async onInputUsuario() {
    await this.filtrarUsuarios();
  }

  async onInputPaciente() {
    await this.filtrarPacientes();
  }

  async filtrarUsuarios() {
    if (this.formUsuario.get('filtro')?.value == '') return;
    this.usuarios = await this.usuarioService.buscarUsuariosComFiltro(
      this.formUsuario.get('filtro')?.value
    );
  }

  async filtrarPacientes() {
    if (this.formPaciente.get('filtro')?.value == '') return;
    this.pacientes = await this.pacienteService.buscarPacientesComFiltro(
      this.formPaciente.get('filtro')?.value
    );
  }

  exibirCargo(tipoUsuario: string) {
    if (tipoUsuario === 'ADMINISTRADOR') return 'Administrador(a)';
    if (tipoUsuario === 'MEDICO') return 'Médico(a)';
    return 'Enfermeiro(a)';
  }

  exibirTelefone(telefone: string) {
    return this.pacienteService.converterTelefoneToView(telefone);
  }

  obterIdadePaciente(paciente: IPaciente) {
    return this.pacienteService.calcularIdadePaciente(paciente);
  }
}
