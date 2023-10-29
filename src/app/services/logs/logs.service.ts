import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ILogs } from 'src/app/interfaces/ILogs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private loginService: LoginService,
    private toastr: ToastrService,
    private httpClient: HttpClient) { }
    logs:ILogs[] = []
    urlBase = 'http://localhost:4200/api/logs';

  async buscarTodos() {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try{
      this.logs = await lastValueFrom(this.httpClient.get<ILogs[]>(`${this.urlBase}`, {headers}));
    }catch(e:any){
      if(e.error[0].mensagem){
        this.toastr.error(e.error[0].mensagem,'Erro ao Buscar');
      }else if(e.error){
        this.toastr.error(e.error,'Erro ao Buscar');
      }
      return null;
    }
    return this.logs;
  }
}
