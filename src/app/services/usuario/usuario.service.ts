import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: IUsuario[]=[];

  private readonly API_USUARIOS =  'http://localhost:4200/usuarios'

  constructor(private httpClient: HttpClient) { }

  async cadastrarUsuario(usuario: IUsuario){
    try{
      return await lastValueFrom (this.httpClient.post(this.API_USUARIOS, usuario));
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
    } catch (e){
      throw new Error("Erro ao editar Usuário!")
    }
  }

  async editarUsuario(usuario: IUsuario){
    try{
      return await lastValueFrom (this.httpClient.put(`${this.API_USUARIOS}/${usuario.id}`, usuario));
    } catch (e){
      throw new Error("Erro ao editar Usuário!")
    }
  }
  async deletarUsuario(id: number){
    try{
      return await lastValueFrom (this.httpClient.delete(this.API_USUARIOS + '/' + id));
    } catch (e){
      throw new Error("Erro ao deletar Usuário!")
    }
}
}
