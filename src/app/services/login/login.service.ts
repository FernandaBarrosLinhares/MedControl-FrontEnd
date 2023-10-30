import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private httpClient: HttpClient, 
    private router: Router, 
    private toastr: ToastrService
  ) { }

  async login(email: string, senha: string) {
    try{
      const usuarioLogado = await lastValueFrom(this.httpClient.post('http://localhost:4200/api/usuarios/login', {email, senha}));
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao logar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao logar');
      }
    }
  }

  obterNomeUsuarioLogado() {
    const usuarioString = localStorage.getItem("usuarioLogado");
    if (usuarioString === null) return;
    const usuarioLogado = <IUsuario>JSON.parse(usuarioString);
    const nome = usuarioLogado.nomeCompleto;
    return nome?.substring(0, nome?.indexOf(' '));
  }

  obterTipoUsuarioLogado() {
    const usuarioString = localStorage.getItem("usuarioLogado");
    if (usuarioString === null) return;
    const usuarioLogado = <IUsuario>JSON.parse(usuarioString);
    return usuarioLogado.tipoUsuario;
  }

  obterHeadersUsuarioLogado() {
    const idUsuarioLogado  = this.idUsuarioLogado();
    if (idUsuarioLogado === undefined) return;
    return new HttpHeaders().set('idUsuarioLogado', `${idUsuarioLogado}`);
  }

  idUsuarioLogado() {
    const usuarioString = localStorage.getItem("usuarioLogado");
    if (usuarioString === null) return;
    const usuarioLogado = <IUsuario>JSON.parse(usuarioString);
    const id = usuarioLogado.id;
    return id;
  }

  logado() {
    const usuario = localStorage.getItem("usuarioLogado");
    return usuario !== null;
  }

  logout() {
    localStorage.removeItem("usuarioLogado");
  }
}
