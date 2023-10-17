import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import IPaciente from 'src/app/interfaces/IPaciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  pacientes:IPaciente[]=[];
  constructor(private http:HttpClient) { }
  urlBase = 'http://localhost:4200/api/pacientes';
  urlBaseEndereco = 'http://localhost:4200/api/enderecos'
  async buscarPaciente(){
    this.pacientes = await lastValueFrom(this.http.get<IPaciente[]>(`${this.urlBase}`));
    return this.pacientes;
  }
// TODO mudar a logica do usuario logado quando fizer o login
  async cadastrarPaciente(paciente:IPaciente){
    //let usuarioLogado = localStorage.getItem("USUARIOLOGADO");
    //console.log(usuarioLogado);
    let headers = new HttpHeaders().set('idUsuarioLogado','1');
    try{
      return await firstValueFrom(this.http.post<any>(`${this.urlBase}`,paciente,{headers:headers}));
    }catch(e){
      return e;
    }
  }
  async atualizarPaciente(paciente:IPaciente,pacienteId:number){
    //let usuarioLogado = localStorage.getItem("USUARIOLOGADO");
    //console.log(usuarioLogado);
    let headers = new HttpHeaders().set('idUsuarioLogado','1');
    try{
      return await firstValueFrom(this.http.put<any>(`${this.urlBase}/${pacienteId}`,paciente,{headers:headers}));
    }catch(e){
      return e;
    }
  }

  async buscarPacientePorId(id:number){
    try{
      return await lastValueFrom(this.http.get<any>(`${this.urlBase}/${id}`));
    }catch(e){
      return null;
    }
  }

  async deletarPaciente(id:number){
    let headers = new HttpHeaders().set('idUsuarioLogado','1');
    try{
      return await lastValueFrom(this.http.delete<any>(`${this.urlBase}/${id}`,{headers:headers}));
    }catch(e){
      return null;
    }
  }

  async buscarPacienteComFiltro(fltro:string){
    try{
      return await lastValueFrom(this.http.get<any>(`${this.urlBase}/${fltro}`));
    }catch(e){
      return null;
    }
  }


}
