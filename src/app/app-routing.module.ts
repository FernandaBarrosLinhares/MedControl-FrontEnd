import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroConsultaComponent } from './components/consulta/cadastro-consulta/cadastro-consulta.component';
import { CadastroExameComponent } from './components/exame/cadastro-exame/cadastro-exame.component';
import { PrincipalLayoutComponent } from './layouts/principal-layout/principal-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cadastro-exame',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PrincipalLayoutComponent,
    children: [
      {
        path: "cadastro-consulta",
        component: CadastroConsultaComponent
      },
      {
        path: 'cadastro-exame',
        component: CadastroExameComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
