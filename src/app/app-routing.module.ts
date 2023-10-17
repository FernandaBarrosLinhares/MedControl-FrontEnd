import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroConsultaComponent } from './components/consulta/cadastro-consulta/cadastro-consulta.component';
import { CadastroExameComponent } from './components/exame/cadastro-exame/cadastro-exame.component';
import { CadastroMedicamentosComponent } from './components/cadastro-medicamentos/cadastro-medicamentos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cadastro-exame',
    pathMatch: 'full',
  },
  {
		path: "cadastro-consulta",
		component: CadastroConsultaComponent
	},
  {
    path: 'cadastro-exame',
    component: CadastroExameComponent,
  },
  {
    path: 'cadastro-medicamento',
    component: CadastroMedicamentosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
