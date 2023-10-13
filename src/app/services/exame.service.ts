import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IExame from '../interfaces/IExame';

@Injectable({
  providedIn: 'root',
})
export class ExameService {
  urlBase = 'http://localhost:4200/api/exames';
  exames: IExame[] = [];

  constructor(private httpClient: HttpClient) {}

  // TODO apagar abaixo quando tiver o service de paciente
  async buscarTodosPacientes() {
    return await lastValueFrom(
      this.httpClient.get('http://localhost:4200/api/pacientes')
    );
  }

  async buscarTodos() {
    this.exames = await lastValueFrom(
      this.httpClient.get<IExame[]>(this.urlBase)
    );
    return this.exames;
  }

  async buscarPorId(id: number) {
    try {
      return await lastValueFrom(this.httpClient.get(`${this.urlBase}/${id}`));
    } catch (error) {
      return null;
    }
  }

  async salvar(exame: IExame) {
    try {
      return await lastValueFrom(
        this.httpClient.post(`${this.urlBase}`, exame)
      );
    } catch (e) {
      return e;
    }
  }

  async editar(exame: IExame) {
    return await this.httpClient.put(`${this.urlBase}/${exame.id}`, exame);
  }

  async excluir(id: number) {
    await this.httpClient.delete(`${this.urlBase}/${id}`);
  }
}
