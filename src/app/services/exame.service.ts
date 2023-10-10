import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IExame from '../interfaces/IExame';

@Injectable({
  providedIn: 'root'
})
export class ExameService {

	urlBase = 'http://localhost:8080/exames'

  constructor(private httpClient: HttpClient) { }

	buscarTodos() {
		return lastValueFrom(this.httpClient.get(this.urlBase));
	}

	buscarPorId(id: number) {
		return lastValueFrom(this.httpClient.get(`${this.urlBase}/${id}`));
	}

	salvar(exame: IExame) {
		this.httpClient.post(`${this.urlBase}`, exame);
	}

	editar(exame: IExame) {
		this.httpClient.put(`${this.urlBase}/${exame.id}`, exame);
	}

	excluir(id: number) {
		this.httpClient.delete(`${this.urlBase}/${id}`);
	}
}
