import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: IUsuario[]=[];

  private readonly API_USUARIOS =  'http://localhost:4200/api/usuarios'

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private loginService: LoginService
  ) { }

  async cadastrarUsuario(usuario: IUsuario){
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      const response = await lastValueFrom (this.httpClient.post(this.API_USUARIOS, usuario, {headers}));
      this.toastr.success('Cadastro realizado com sucesso','Cadastrado');
      return response;
    } catch (e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Cadastrar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Cadastrar');
      }
      return null;
    }
  }

  buscarUsuarios() {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    return lastValueFrom (this.httpClient.get<IUsuario[]>(this.API_USUARIOS, {headers}))
  }

  async buscarUsuarioId(id: number) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      return await lastValueFrom (this.httpClient.get(this.API_USUARIOS + '/' + id, {headers}));
    } catch (e: any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  async buscarUsuarioPorEmail(email: string) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {
      return await lastValueFrom(this.httpClient.get<IUsuario>(this.API_USUARIOS + '/buscarPorEmail?email=' + email, {headers}))
    } catch (e: any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  async buscarUsuariosComFiltro(fltro:string){
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      return await lastValueFrom(this.httpClient.get<any>(`${this.API_USUARIOS}/listagem/${fltro}`, {headers}));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  async resetarSenha(id: number, email: string, senha: string) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {
      await lastValueFrom(this.httpClient.patch(this.API_USUARIOS + '/resetarSenha', {id, email, senha}, {headers}))
      this.toastr.success('Senha alterada com sucesso','Alterado');
    } catch (e: any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
    }
  }

  async editarUsuario(usuario: IUsuario){
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      const response = await lastValueFrom (this.httpClient.put(`${this.API_USUARIOS}/${usuario.id}`, usuario, {headers}));
      this.toastr.success('Atualizado com sucesso','Atualizado');
      return response;
    } catch (e: any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao editar Usuário! ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao editar Usuário!');
      }
      return null;
    }
  }

  async deletarUsuario(id: number){
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      const response = await lastValueFrom (this.httpClient.delete(this.API_USUARIOS + '/' + id, {headers}));
      this.toastr.success('Cadastro Deletado com sucesso','Deletado');
      return response;
    } catch (e: any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao deletar Usuário!');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao deletar Usuário!');
      }
      return null;
    }
  }

  converterTelefoneToView(telefone: string) {
    return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)} - ${telefone.substring(7)}`
  }
}
