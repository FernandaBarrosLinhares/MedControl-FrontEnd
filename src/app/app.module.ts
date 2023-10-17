import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { CadastroConsultaComponent } from './components/consulta/cadastro-consulta/cadastro-consulta.component';
import { CadastroExameComponent } from './components/exame/cadastro-exame/cadastro-exame.component';
import { CadastroPacienteComponent } from './components/paciente/cadastro-paciente/cadastro-paciente.component';

@NgModule({
	declarations: [
		AppComponent,
		CadastroConsultaComponent,
		CadastroExameComponent,
    CadastroPacienteComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule,
		ReactiveFormsModule,
		NgxMaskDirective,
		NgxMaskPipe,
		HttpClientModule,
	],
	providers: [provideNgxMask()],
	bootstrap: [AppComponent]
})
export class AppModule { }
