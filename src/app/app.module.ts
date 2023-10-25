import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

import { CadastroConsultaComponent } from './components/consulta/cadastro-consulta/cadastro-consulta.component';
import { CadastroDietaComponent } from './components/dieta/cadastro-dieta/cadastro-dieta.component';
import { CadastroExameComponent } from './components/exame/cadastro-exame/cadastro-exame.component';
import { CadastroExercicioComponent } from './components/exercicio/cadastro-exercicio/cadastro-exercicio.component';
import { CadastroMedicamentosComponent } from './components/medicamento/cadastro-medicamentos/cadastro-medicamentos.component';
import { CadastroPacienteComponent } from './components/paciente/cadastro-paciente/cadastro-paciente.component';
import { CadastroUsuarioComponent } from './components/usuario/cadastro-usuario/cadastro-usuario.component';
import { EstatisticasComponent } from './components/estatisticas/estatisticas/estatisticas.component';
import { LoginComponent } from './components/login/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ProntuariosComponent } from './components/prontuairo/prontuarios/prontuarios.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';

import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PrincipalLayoutComponent } from './layouts/principal-layout/principal-layout.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CadastroConsultaComponent,
    CadastroDietaComponent,
    CadastroExameComponent,
    CadastroExercicioComponent,
    CadastroMedicamentosComponent,
    CadastroPacienteComponent,
    CadastroUsuarioComponent,
    PrincipalLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    LoginLayoutComponent,
    EstatisticasComponent,
    LoginComponent,
    ProntuariosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
