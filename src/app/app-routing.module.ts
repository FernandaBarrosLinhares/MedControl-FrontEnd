import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroExameComponent } from './components/exame/cadastro-exame/cadastro-exame.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cadastro-exame',
    pathMatch: 'full',
  },
  {
    path: 'cadastro-exame',
    component: CadastroExameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
