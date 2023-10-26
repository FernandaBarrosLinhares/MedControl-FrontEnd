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
    const id  = this.loginService.idUsuarioLogado();
    if (id === undefined) return;
    let headers = new HttpHeaders().set('idUsuarioLogado', `${id}`);
    try{
      return await lastValueFrom (this.httpClient.post(this.API_USUARIOS, usuario, {headers}));
    } catch (e){
      throw new Error("Erro ao cadastrar Usuário!")
    }
  }

  buscarUsuarios() {
    return lastValueFrom (this.httpClient.get<IUsuario[]>(this.API_USUARIOS))
  }

  async buscarUsuarioId(id: number) {
    try{
      return await lastValueFrom (this.httpClient.get(this.API_USUARIOS + '/' + id));
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
    try {
      console.log(this.API_USUARIOS + '/buscarPorEmail?email=' + email);
      return await lastValueFrom(this.httpClient.get<IUsuario>(this.API_USUARIOS + '/buscarPorEmail?email=' + email))
    } catch (e: any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  async buscarUsuarioComFiltro(fltro:string){
    try{
      return await lastValueFrom(this.httpClient.get<any>(`${this.API_USUARIOS}/listagem/${fltro}`));
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
    try {
      await lastValueFrom(this.httpClient.patch(this.API_USUARIOS + '/resetarsenha', {id, email, senha}))
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
    try{
      return await lastValueFrom (this.httpClient.put(`${this.API_USUARIOS}/${usuario.id}`, usuario));
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
    try{
      return await lastValueFrom (this.httpClient.delete(this.API_USUARIOS + '/' + id));
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
