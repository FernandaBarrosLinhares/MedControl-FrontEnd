import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IDieta } from '../interfaces/IDieta';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  private readonly API_DIETA = 'http://localhost:3000/dietas'

  constructor(private httpClient: HttpClient) { }

  async cadastrarDieta(dieta: IDieta){
    try{
      return await lastValueFrom (this.httpClient.post(this.API_DIETA, dieta));
    } catch (e){
      throw new Error("Erro ao cadastrar Dieta!")
    }
  }

  buscarDieta() {
    return lastValueFrom (this.httpClient.get<IDieta[]>(this.API_DIETA))
  }

  async buscarDietaId(id: number) {
    try{
      return await lastValueFrom (this.httpClient.get(this.API_DIETA + '/' + id));
    } catch (e){
      throw new Error("Erro ao editar Dieta!")
    }
  }

  async editarDieta(dieta: IDieta, dietaId: number){
    try{
      return await lastValueFrom (this.httpClient.put(`${this.API_DIETA}/${dietaId}`, dieta));
    } catch (e){
      throw new Error("Erro ao editar Dieta!")
    }
  }
  async deletarDieta(id: number){
    try{
      return await lastValueFrom (this.httpClient.delete(this.API_DIETA + '/' + id));
    } catch (e){
      throw new Error("Erro ao deletar Dieta!")
    }
}
}
