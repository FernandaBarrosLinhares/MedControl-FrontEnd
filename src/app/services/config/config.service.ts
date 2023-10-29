import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';
import IConfig from 'src/app/interfaces/IConfig';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configMudou = new EventEmitter();
  urlBase = 'http://localhost:4200/api/config/1';
  configs: IConfig;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {
    this.configs = {
      nomeEmpresa: '',
      logoUrl: '',
      corFonte: '',
      corPrincipal: '',
    };
  }

  async buscarConfigs() {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {
      this.configs = await lastValueFrom(
        this.httpClient.get<IConfig>(`${this.urlBase}`, { headers })
      );
      this.configuracaoMudou();
    } catch (e: any) {
      if (e.error[0].mensagem) {
        this.toastr.error(e.error[0].mensagem, 'Erro ao Buscar');
      } else if (e.error) {
        this.toastr.error(e.error, 'Erro ao Buscar');
      }
      return null;
    }
    return this.configs;
  }

  async editar(config: IConfig) {
    const headers = this.loginService.obterHeadersUsuarioLogado();

    try {
      let response = await firstValueFrom(
        this.httpClient.put<IConfig>(this.urlBase , config, {
          headers: headers,
        })
      );
      this.toastr.success('Atualizado com sucesso', 'Atualizado');
      this.buscarConfigs();
      return response;
    } catch (e: any) {
      if (e.error[0].mensagem) {
        this.toastr.error(e.error[0].mensagem, 'Erro ao Atualizar');
      } else if (e.error) {
        this.toastr.error(e.error, 'Erro ao Atualizar');
      }
      return e;
    }
  }

  configuracaoMudou() {
    this.configMudou.emit(this.configs);
  }
}
