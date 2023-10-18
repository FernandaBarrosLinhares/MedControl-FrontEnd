import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private usuarioService: UsuariosService) { }

  async login(email: string, senha: string) {
    const usuarios = await this.usuarioService.buscarUsuarios();
    for(const usuario of usuarios){
      const emailCorreto = email === usuario.email;
      const senhaCorreta = senha === usuario.senha;
      if (emailCorreto && senhaCorreta){
      localStorage.setItem("usuario", JSON.stringify(usuario));
      return;
    }
    }

    throw new Error ("Invalidas!")
  }

  obterNomeUsuarioLogado() {
    const usuarioString = localStorage.getItem("usuario");
    if (usuarioString === null) return;
    const usuarioLogado = <IUsuario>JSON.parse(usuarioString);
    const nome = usuarioLogado.nome;
    return nome?.substring(0, nome?.indexOf(' '));
  }

  logado() {
    const usuario = localStorage.getItem("usuario");
    return usuario !== null;
  }

  logout() {
    localStorage.removeItem("usuario");
  }

}
