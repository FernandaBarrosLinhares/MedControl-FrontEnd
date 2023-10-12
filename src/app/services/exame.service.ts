import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IExame from '../interfaces/IExame';

@Injectable({
  providedIn: 'root'
})
export class ExameService {

	urlBase = 'http://localhost:4200/api/exames'
	exames : IExame[] = [];

  constructor(private httpClient: HttpClient) { }

	async buscarTodos() {
		this.exames = await lastValueFrom(this.httpClient.get<IExame[]>(this.urlBase));
		return this.exames;
	}

	async buscarPorId(id: number) {
		return await lastValueFrom(this.httpClient.get(`${this.urlBase}/${id}`));
	}

	async salvar(exame: IExame) {
		try {
      await lastValueFrom(this.httpClient.post(`${this.urlBase}`, exame));
    } catch (e) {
      console.error(e);
    }
	}

	editar(exame: IExame) {
		this.httpClient.put(`${this.urlBase}/${exame.id}`, exame);
	}

	excluir(id: number) {
		this.httpClient.delete(`${this.urlBase}/${id}`);
	}
}
