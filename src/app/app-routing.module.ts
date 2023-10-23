import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroConsultaComponent } from './components/consulta/cadastro-consulta/cadastro-consulta.component';
import { CadastroExameComponent } from './components/exame/cadastro-exame/cadastro-exame.component';
import { CadastroExercicioComponent } from './components/exercicio/cadastro-exercicio/cadastro-exercicio.component';
import { CadastroPacienteComponent } from './components/paciente/cadastro-paciente/cadastro-paciente.component';
import { PrincipalLayoutComponent } from './layouts/principal-layout/principal-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ProntuariosComponent } from './components/prontuairo/prontuarios/prontuarios.component';
import { logadoGuard } from './guards/logado.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'labmedication/cadastro-exame',
  //   pathMatch: 'full',
  // },
  { path: '',
    component: LoginLayoutComponent,
    children: []
  },
  {
    path: 'labmedication',
    component: PrincipalLayoutComponent,
    canActivateChild: [logadoGuard],
    children: [
      {
        path: 'cadastro-consulta',
        component: CadastroConsultaComponent
      },
      {
        path: 'cadastro-exame',
        component: CadastroExameComponent,
      },
      {
        path: "cadastro-exercicio",
        component: CadastroExercicioComponent
      },
      {
        path:'cadastro-paciente',
        component: CadastroPacienteComponent
      },
      {
        path: 'prontuarios',
        component: ProntuariosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
