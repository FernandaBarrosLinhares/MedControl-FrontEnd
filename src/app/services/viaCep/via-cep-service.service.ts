import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IEndereco from '../../interfaces/IEndereco';

@Injectable({
  providedIn: 'root'
})
export class ViaCepServiceService {

  constructor(private http:HttpClient) { }

  getEndereco(cep: string) {
    let cepFormatado = cep.split(/\.|-/).join('')
    return this.http.get<any>(`https://viacep.com.br/ws/${cepFormatado}/json/`);
  }
}
