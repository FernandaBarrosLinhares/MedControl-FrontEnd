import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarios: any = [];
  usuarioLogado: any = {};
  formularioLogin: any = FormGroup;

  constructor(
    private loginService: LoginService,
    private rotas: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.checarUsuarioLogado();
    this.criarFormLogin();
  }
  checarUsuarioLogado() {
    if (this.loginService.logado()) {
      this.rotas.navigate(['/home']);
    }
  }
  criarFormLogin() {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  async login() {
    const email = this.formularioLogin.get('email')?.value;
    const senha = this.formularioLogin.get('senha')?.value;
    await this.loginService.login(email, senha);
  }

  criarConta() {
    const modal = document.querySelector('dialog');
    if (modal == null) return;
    modal.showModal();
  }

  fecharModal() {
    const modal = document.querySelector('dialog');
    if (modal == null) return;
    modal.close();
  }
}
