import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPacienteComponent } from './components/paciente/cadastro-paciente/cadastro-paciente.component';

const routes: Routes = [
  {path:'cadastro-paciente',component:CadastroPacienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
