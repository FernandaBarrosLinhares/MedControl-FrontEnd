import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, NgForm, FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: any = [];
  mensagemCadastro:string="";
  usuarioLogado:any={};
  mensagem: string = '';
  @ViewChild('loginForm')
  formLog!: NgForm;
  @ViewChild('CadastroForm')
  formCad!: NgForm;
  formularioLogin:any = FormGroup;
  formulariocadastro:any = FormGroup;

  constructor(private loginService: LoginService,private rotas : Router,private fb: FormBuilder) {

  }
  ngOnInit() {
    this.checarUsuarioLogado()
    this.criarFormLogin();
  }
  checarUsuarioLogado(){
    if(this.loginService.logado()){
      this.rotas.navigate(['/home']);
    }
  }
  criarFormLogin() {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  async login() {
    this.limparMensagem();
    if(this.formularioLogin.invalid){
      return
    }
    try{
      const email = this.formularioLogin.get('email')?.value;
      const senha = this.formularioLogin.get('senha')?.value;
      await this.loginService.login(email, senha);
      this.mensagem = 'Usuário logado!'
    }
    catch(e) {
      this.mensagem = 'Credenciais Inválidas!!!'
  }
}
limparMensagem() {
  setTimeout(() => {
    this.mensagem = "";
    this.mensagemCadastro = "";
  }, 3000);
}
criarConta(){

}
}

