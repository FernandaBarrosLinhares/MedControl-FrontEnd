import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroExercicioComponent } from './exercicio/cadastro-exercicio/cadastro-exercicio.component';

const routes: Routes = [
  {
		path: "cadastro-exercicio",
		component: CadastroExercicioComponent
	},
  {
    path: "",
    redirectTo: "/cadastro-exercicio",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
