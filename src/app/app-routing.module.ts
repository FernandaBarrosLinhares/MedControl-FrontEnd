import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroConsultaComponent } from './components/consulta/cadastro-consulta/cadastro-consulta.component';
import { CadastroDietaComponent } from './components/dieta/cadastro-dieta/cadastro-dieta.component';
import { CadastroExameComponent } from './components/exame/cadastro-exame/cadastro-exame.component';
import { CadastroExercicioComponent } from './components/exercicio/cadastro-exercicio/cadastro-exercicio.component';
import { CadastroMedicamentosComponent } from './components/medicamento/cadastro-medicamentos/cadastro-medicamentos.component';
import { CadastroPacienteComponent } from './components/paciente/cadastro-paciente/cadastro-paciente.component';
import { CadastroUsuarioComponent } from './components/usuario/cadastro-usuario/cadastro-usuario.component';
import { EstatisticasComponent } from './components/estatisticas/estatisticas/estatisticas.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProntuariosComponent } from './components/prontuairo/prontuarios/prontuarios.component';
import { ProntuarioPacienteComponent } from './components/prontuairo/prontuario-paciente/prontuario-paciente.component';

import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PrincipalLayoutComponent } from './layouts/principal-layout/principal-layout.component';

import { logadoGuard } from './guards/logado.guard';
import { LogsComponent } from './components/logs/logs/logs.component';
import { adminGuard } from './guards/admin.guard';
import { enfermeiroGuard } from './guards/enfermeiro.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'labmedication',
    component: PrincipalLayoutComponent,
    canActivateChild: [logadoGuard],
    children: [
      {
        path: '',
        component: EstatisticasComponent
      },
      {
        path: 'cadastro-consulta',
        component: CadastroConsultaComponent,
        canActivate:[enfermeiroGuard]
      },
      {
        path: 'cadastro-dieta',
        component: CadastroDietaComponent,
      },
      {
        path: 'cadastro-exame',
        component: CadastroExameComponent,
        canActivate:[enfermeiroGuard]
      },
      {
        path: 'cadastro-exercicio',
        component: CadastroExercicioComponent,
      },
      {
        path: 'cadastro-medicamento',
        component: CadastroMedicamentosComponent,
      },
      {
        path: 'cadastro-paciente',
        component: CadastroPacienteComponent,
      },
      {
        path: 'cadastro-usuario',
        component: CadastroUsuarioComponent,
        canActivate:[adminGuard]
      },
      {
        path: 'prontuarios',
        component: ProntuariosComponent,
        canActivate:[enfermeiroGuard]
      },
      {
        path: 'prontuarios/paciente',
        component: ProntuarioPacienteComponent,
        canActivate:[enfermeiroGuard]
      },
      {
        path: 'registros',
        component: LogsComponent,
        canActivate:[adminGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
