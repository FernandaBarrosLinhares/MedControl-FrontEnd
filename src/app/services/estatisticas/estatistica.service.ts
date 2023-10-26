import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import IEstatistica from 'src/app/interfaces/IEstatistica';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {

  readonly URL_API = 'http://localhost:4200/api/estatisticas';

  constructor(private httpClient: HttpClient) { }

  async buscarEstatisticas() {
    return await lastValueFrom(
      this.httpClient.get<IEstatistica>(this.URL_API)
    )
  }
}
