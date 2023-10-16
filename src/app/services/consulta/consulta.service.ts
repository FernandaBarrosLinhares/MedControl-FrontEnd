import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IConsulta from 'src/app/interfaces/IConsulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  urlBase = 'http://localhost:8080/api/consultas';
  consultas:IConsulta[] =[]

  constructor(private httpClient: HttpClient) { }

  // TODO apagar abaixo quando tiver o service de paciente
  async buscarTodosPacientes() {
    return lastValueFrom(
      this.httpClient.get('http://localhost:4200/api/pacientes')
      );
  }


  async buscarTodos() {
		return lastValueFrom(
      this.httpClient.get('http://localhost:4200/api/consultas')
      );
	}

	async buscarPorId(id: number) {
    try{
		return await lastValueFrom(this.httpClient.get(`${this.urlBase}/${id}`));
	}    catch (error) {
        return null;
  }

  }

	async salvar(consulta: IConsulta) {
    try {
      return await lastValueFrom(
        this.httpClient.post(`${this.urlBase}`, consulta)
	    );
   } catch (e) {
    return e;
   }
  }

	async editar(consulta: IConsulta) {
		return await this.httpClient.put(`${this.urlBase}/${consulta.id}`, consulta);
	}

	async excluir(id: number) {
		await this.httpClient.delete(`${this.urlBase}/${id}`);
	}
}
