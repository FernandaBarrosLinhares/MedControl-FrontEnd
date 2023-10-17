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
import { PrincipalLayoutComponent } from './layouts/principal-layout/principal-layout.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		CadastroConsultaComponent,
		CadastroExameComponent,
    CadastroPacienteComponent,
		PrincipalLayoutComponent,
		NavbarComponent,
  	SidebarComponent,
  	LoginLayoutComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule,
		ReactiveFormsModule,
		NgxMaskDirective,
		NgxMaskPipe,
		HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
	],
	providers: [provideNgxMask()],
	bootstrap: [AppComponent]
})
export class AppModule { }
