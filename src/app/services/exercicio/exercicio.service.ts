import { IExercicio } from '../../interfaces/IExercicio';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import IPaciente from '../../interfaces/IPaciente';
import { LoginService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ExercicioService {
  urlBase = 'http://localhost:4200/api/exercicios';
  exercicios: IExercicio[] = [];

  constructor(private httpClient: HttpClient,
    private loginService: LoginService,
    private toastr: ToastrService
    ) {}

  async buscarTodos() {
    try{
      this.exercicios = await lastValueFrom(this.httpClient.get<IExercicio[]>(`${this.urlBase}`));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
    return this.exercicios;
  }

  async buscarPorId(id: number) {
    try {
      return await lastValueFrom(this.httpClient.get(`${this.urlBase}/${id}`));
    } catch (e: any) {
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  async salvar(exercicio: IExercicio) {
    const idUsuarioLogado = this.loginService.idUsuarioLogado();
    if (idUsuarioLogado === undefined) return;
    let headers = new HttpHeaders().set('idUsuarioLogado', `${idUsuarioLogado}`);

    try {
      const response =  await lastValueFrom(
        this.httpClient.post(`${this.urlBase}`, exercicio, { headers })
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

  async editar(exercicio: IExercicio,exercicioId: number) {
    const idUsuarioLogado = this.loginService.idUsuarioLogado();
    if (idUsuarioLogado === undefined) return;
    let headers = new HttpHeaders().set('idUsuarioLogado', `${idUsuarioLogado}`);

    try{
      let response = await firstValueFrom(this.httpClient.put<any>(`${this.urlBase}/${exercicioId}`,exercicio,{headers:headers}));
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
    const idUsuarioLogado = this.loginService.idUsuarioLogado();
    if (idUsuarioLogado === undefined) return;
    let headers = new HttpHeaders().set('idUsuarioLogado', `${idUsuarioLogado}`);

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
