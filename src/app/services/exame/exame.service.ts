import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import IExame from '../../interfaces/IExame';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class ExameService {
  urlBase = 'http://localhost:4200/api/exames';
  exames: IExame[] = [];

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService, 
    private httpClient: HttpClient
  ) {}

  async buscarTodos() {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      this.exames = await lastValueFrom(this.httpClient.get<IExame[]>(`${this.urlBase}`, {headers}));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
    return this.exames;
  }

  async buscarPorId(id: number) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {
      return await lastValueFrom(this.httpClient.get(`${this.urlBase}/${id}`, {headers}));
    } catch (e: any) {
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  async salvar(exame: IExame) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {
      const response =  await lastValueFrom(
        this.httpClient.post(`${this.urlBase}`, exame, { headers })
      );
      this.toastr.success('Cadastro realizado com sucesso','Cadastrado');
      return response;
    } catch (e: any) {
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao cadastrar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao cadastrar');
      }
      return e;
    }
  }

  async editar(exame: IExame) {
    const headers = this.loginService.obterHeadersUsuarioLogado();
    
    try{
      let response = await firstValueFrom(this.httpClient.put<any>(`${this.urlBase}/${exame.id}`,exame,{headers:headers}));
      this.toastr.success('Atualizado com sucesso','Atualizado');
      return response;
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Atualizar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Atualizar');
      }
      return e;
    }
  }

  async excluir(id: number) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {   
      const response = await lastValueFrom(
        this.httpClient.delete(`${this.urlBase}/${id}`, { headers }));
        this.toastr.success('Cadastro Deletado com sucesso','Deletado');
      return response;
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Deltar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Deletar');
      }
      return null;
    }
  }
}
