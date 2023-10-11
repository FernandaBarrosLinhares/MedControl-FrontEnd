import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IConsulta from 'src/app/interfaces/IConsulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  urlBase = 'http://localhost:8080/consultas'

  constructor(private httpClient: HttpClient) { }

  buscarTodos() {
		return lastValueFrom(this.httpClient.get(this.urlBase));
	}

	buscarPorId(id: number) {
		return lastValueFrom(this.httpClient.get(`${this.urlBase}/${id}`));
	}

	salvar(consulta: IConsulta) {
		this.httpClient.post(`${this.urlBase}`, consulta);
	}

	editar(consulta: IConsulta) {
		this.httpClient.put(`${this.urlBase}/${consulta.id}`, consulta);
	}

	excluir(id: number) {
		this.httpClient.delete(`${this.urlBase}/${id}`);
	}
}
