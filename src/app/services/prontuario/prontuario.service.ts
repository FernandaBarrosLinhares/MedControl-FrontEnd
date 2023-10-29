import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { lastValueFrom } from 'rxjs';
import IProntuario from 'src/app/interfaces/IProntuario';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProntuarioService {
  readonly URL_API = 'http://localhost:4200/api/prontuarios';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  async buscarProntuario(pacienteId: number, nomeCompletoPaciente: string) {
    const headers = this.loginService.obterHeadersUsuarioLogado();
    try {
      return await lastValueFrom(
        this.httpClient.get<IProntuario>(
          `${this.URL_API}?pacienteId=${pacienteId}&?nomeCompletoPaciente=${nomeCompletoPaciente}`,
          { headers }
        )
      );
    } catch (e: any) {
      if (e.error[0].mensagem) {
        this.toastr.error(e.error[0].mensagem, 'Erro ao Buscar');
      } else if (e.error) {
        this.toastr.error(e.error, 'Erro ao Buscar');
      }
      return e;
    }
  }
}
