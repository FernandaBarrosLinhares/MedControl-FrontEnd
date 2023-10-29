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
    let str = url.includes('?id=') ? 'Edição de' : 'Cadastro de';

    if (url == '/labmedication') return 'Início';
    if (url.includes('/labmedication/cadastro-consulta')) return `${str} consulta`;
    if (url.includes('/labmedication/cadastro-dieta')) return `${str} dieta`;
    if (url.includes('/labmedication/cadastro-exame')) return `${str} exame`;
    if (url.includes('/labmedication/cadastro-exercicio')) return `${str} exercício`;
    if (url.includes('/labmedication/cadastro-medicamento')) return `${str} medicamento`;
    if (url.includes('/labmedication/cadastro-paciente')) return `${str} paciente`;
    if (url.includes('/labmedication/cadastro-usuario')) return `${str} usuário`;
    if (url.includes('/labmedication/prontuarios')) return 'Prontuários';
    if (url.includes('/labmedication/registros')) return 'Registro de atividades';
    return 'Página não encontrada';
  }
}
