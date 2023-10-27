import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import IConsulta from 'src/app/interfaces/IConsulta';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  urlBase = 'http://localhost:4200/api/consultas';
  consultas: IConsulta[] = [];

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  async buscarTodos() {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      this.consultas = await lastValueFrom(this.httpClient.get<IConsulta[]>(`${this.urlBase}`, {headers}));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
    return this.consultas;
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

  async salvar(consulta: IConsulta) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {
      const response =  await lastValueFrom(
        this.httpClient.post(`${this.urlBase}`, consulta, { headers })
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

  async editar(consulta: IConsulta, consultaId: number) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      let response = await firstValueFrom(this.httpClient.put<any>(`${this.urlBase}/${consultaId}`,consulta,{headers:headers}));
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
