import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import IDieta from 'src/app/interfaces/IDieta';
import { LoginService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  private readonly API_DIETA = 'http://localhost:4200/api/dietas'
  dietas: IDieta[] = [];

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private httpClient: HttpClient
  ) { }

  async cadastrarDieta(dieta: IDieta){
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      const response =  await lastValueFrom (this.httpClient.post(this.API_DIETA, dieta, {headers}));
      this.toastr.success('Cadastro realizado com sucesso','Cadastrado');
      return response;
    } catch (e: any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao cadastrar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao cadastrar');
      }
      return e;
    }
  }

  async buscarDietas() {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      this.dietas = await lastValueFrom(this.httpClient.get<IDieta[]>(`${this.API_DIETA}`, {headers}));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
    return this.dietas;
  }

  async buscarDietaId(id: number) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {
      return await lastValueFrom(this.httpClient.get(`${this.API_DIETA}/${id}`, {headers}));
    } catch (e: any) {
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  async editarDieta(dieta: IDieta, dietaId: number){
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      let response = await firstValueFrom(this.httpClient.put<any>(`${this.API_DIETA}/${dietaId}`,dieta,{headers}));
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
  async deletarDieta(id: number){
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {   
      const response = await lastValueFrom(
        this.httpClient.delete(`${this.API_DIETA}/${id}`, { headers }));
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
