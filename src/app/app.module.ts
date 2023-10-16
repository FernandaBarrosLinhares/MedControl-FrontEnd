import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { CadastroExameComponent } from './components/exame/cadastro-exame/cadastro-exame.component';

@NgModule({
	declarations: [
		AppComponent,
		CadastroExameComponent,
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
