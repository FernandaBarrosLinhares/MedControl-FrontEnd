import { IExercicio } from '../../interfaces/IExercicio';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import IPaciente from '../../interfaces/IPaciente';

@Injectable({
  providedIn: 'root',
})
export class ExercicioService {
  urlBase = 'http://localhost:4200/api/exercicios';
  exercicios: IExercicio[] = [];

  constructor(private httpClient: HttpClient) {}

  // TODO apagar abaixo quando tiver o service de paciente
  async buscarTodosPacientes() {
    return await lastValueFrom(
      this.httpClient.get<IPaciente[]>('http://localhost:4200/api/pacientes')
    );
  }

  async buscarTodos() {
    this.exercicios = await lastValueFrom(
      this.httpClient.get<IExercicio[]>(this.urlBase)
    );
    return this.exercicios;
  }

  async buscarPorId(id: number) {
    return await lastValueFrom(
      this.httpClient.get(`${this.urlBase}/${id}`)
    ).catch((e) => {
      console.log(e.error);
      return null;
    });
  }

  async salvar(exercicio: IExercicio) {
    try {
      return await lastValueFrom(
        this.httpClient.post(`${this.urlBase}`, exercicio)
      );
    } catch (e) {
      return e;
    }
  }

  async editar(exercicio: IExercicio) {
    return await this.httpClient.put(
      `${this.urlBase}/${exercicio.id}`,
      exercicio
    );
  }

  async excluir(id: number) {
    await this.httpClient.delete(`${this.urlBase}/${id}`);
  }
}
