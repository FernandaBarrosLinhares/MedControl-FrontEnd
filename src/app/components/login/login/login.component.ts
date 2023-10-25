import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UsuariosService } from 'src/app/services/usuario/usuario.service';
import { ConfirmarSenha } from 'src/app/validators/confirmar-senha.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuarios: any = [];
  usuarioLogado: any = {};
  formLogin: any = FormGroup;
  formResetSenha: any = FormGroup;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuariosService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.formResetSenha = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      repetirSenha: ['', [Validators.required, Validators.minLength(8), ]]
    },{ 
      validators: [ConfirmarSenha.confirmarSenhaValidations] 
    });
  }

  async login() {
    const email = this.formLogin.get('email')?.value;
    const senha = this.formLogin.get('senha')?.value;
    await this.loginService.login(email, senha);
    this.router.navigate(['labmedication']);
  }

  abrirModal(selector: string) {
    const modal = document.querySelector<HTMLDialogElement>(selector);
    if (modal == null) return;
    modal.showModal();
  }

  fecharModal(selector: string) {
    const modal = document.querySelector<HTMLDialogElement>(selector);
    if (modal == null) return;
    modal.close();
  }

  async resetarSenha() {
    console.log(this.formResetSenha);
    const { email, senha } = this.formResetSenha.value;
    const usuarioPorEmail = await this.usuarioService.buscarUsuarioPorEmail(email);

    if (usuarioPorEmail == null) {
      this.fecharModal('#modalResetSenha');
      return;
    }

    if (usuarioPorEmail.id == undefined) return;

    await this.usuarioService.resetarSenha(usuarioPorEmail.id, email, senha);
    this.fecharModal('#modalResetSenha');
  }
}
