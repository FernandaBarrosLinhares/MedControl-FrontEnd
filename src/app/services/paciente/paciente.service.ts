import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, lastValueFrom} from 'rxjs';
import IPaciente from 'src/app/interfaces/IPaciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacientes:IPaciente[]=[];
  
  constructor(private http:HttpClient,
    private toastr: ToastrService) { }
  urlBase = 'http://localhost:4200/api/pacientes';
  urlBaseEndereco = 'http://localhost:4200/api/enderecos'
  async buscarPaciente(){
    try{
      this.pacientes = await lastValueFrom(this.http.get<IPaciente[]>(`${this.urlBase}`));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
    return this.pacientes;
  }
// TODO mudar a logica do usuario logado quando fizer o login
  async cadastrarPaciente(paciente:IPaciente){
    //let usuarioLogado = localStorage.getItem("USUARIOLOGADO");
    //console.log(usuarioLogado);
    let headers = new HttpHeaders().set('idUsuarioLogado','1');
    try{
      const response = await firstValueFrom(this.http.post<any>(`${this.urlBase}`,paciente,{headers:headers}));
      this.toastr.success('Cadastro realizado com sucesso','Cadastrado');
      return response;
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao cadastrar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao cadastrar');
      }
      return e;
    }
  }
  async atualizarPaciente(paciente:IPaciente,pacienteId:number){
    //let usuarioLogado = localStorage.getItem("USUARIOLOGADO");
    //console.log(usuarioLogado);
    let headers = new HttpHeaders().set('idUsuarioLogado','1');
    try{
      let response = await firstValueFrom(this.http.put<any>(`${this.urlBase}/${pacienteId}`,paciente,{headers:headers}));
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

  async buscarPacientePorId(id:number){
    try{
      return await lastValueFrom(this.http.get<any>(`${this.urlBase}/${id}`));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  async deletarPaciente(id:number){
    let headers = new HttpHeaders().set('idUsuarioLogado','1');
    try{
      await firstValueFrom(this.http.delete<any>(`${this.urlBase}/${id}`,{headers:headers}));
      this.toastr.success('Cadastro Deletado com sucesso','Deletado');
      return true;
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Deltar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Deletar');
      }
      return null;
    }
  }

  async buscarPacienteComFiltro(fltro:string){
    try{
      return await lastValueFrom(this.http.get<any>(`${this.urlBase}/listagem/${fltro}`));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
  }

  calcularIdadePaciente(paciente: IPaciente) {
    const dataNascimento = this.converterDataBdToDate(paciente.dataNascimento);
    const anoAtual = new Date();
    let idade = anoAtual.getFullYear() - dataNascimento.getFullYear();
    if (anoAtual.getMonth() < dataNascimento.getMonth()) {
      idade--;
    } else if (anoAtual.getMonth() == dataNascimento.getMonth() && anoAtual.getDay() < dataNascimento.getDay()) {
      idade--;
    }
    return idade;
  }

  converterDataBdToDate(data: string) {
    let dataSub = data.split('/');
    return new Date(`${dataSub[1]}/${dataSub[0]}/${dataSub[2]}`);
  }

  converterTelefoneToView(telefone: string) {
    return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)} - ${telefone.substring(7)}`
  }
}
