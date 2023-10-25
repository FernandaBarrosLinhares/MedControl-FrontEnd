import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  urlEventEmitter = new EventEmitter();

  constructor() { }

  mudouURL(url: string) {
    this.urlEventEmitter.emit(url);
  }

  definirTituloPagina(url: string) {
    console.log(url);
    let titulo = '';
    switch(url) {
      case '/labmedication':
        titulo = 'Início';
        break;
      case '/labmedication/cadastro-consulta':
        titulo = 'Cadastro de consulta';
        break;
      case '/labmedication/cadastro-dieta':
        titulo = 'Cadastro de dieta';
        break;
      case '/labmedication/cadastro-exame':
        titulo = 'Cadastro de exame';
        break;
      case '/labmedication/cadastro-exercicio':
        titulo = 'Cadastro de exercício';
        break;
      case '/labmedication/cadastro-medicamento':
        titulo = 'Cadastro de medicamento';
        break;
      case '/labmedication/cadastro-paciente':
        titulo = 'Cadastro de paciente';
        break;
      case '/labmedication/cadastro-usuario':
        titulo = 'Cadastro de usuário';
        break;
      default:
        titulo = 'Página não encontrada';
    }
    return titulo;
  }
}
