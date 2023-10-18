import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IMedicamentos from 'src/app/interfaces/IMedicamentos';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  urlBase = 'http://localhost:4200/api/medicamentos';
  consultas:IMedicamentos[] =[]

  constructor(private httpClient: HttpClient) { }

  async buscarTodos() {
		return lastValueFrom(
      this.httpClient.get('http://localhost:4200/api/medicamentos')
      );
	}

	async buscarPorId(id: number) {
    try{
		return await lastValueFrom(this.httpClient.get(`${this.urlBase}/${id}`));
	}    catch (error) {
        return null;
  }

  }

	async salvar(consulta: IMedicamentos) {
    try {
      return await lastValueFrom(
        this.httpClient.post(`${this.urlBase}`, consulta)
	    );
   } catch (e) {
    return e;
   }
  }

	async editar(medicamento: IMedicamentos) {
		return await this.httpClient.put(`${this.urlBase}/${medicamento.id}`, medicamento);
	}

	async excluir(id: number) {
		await this.httpClient.delete(`${this.urlBase}/${id}`);
	}
}
