import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDieta } from '../interfaces/IDieta';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  private readonly API_DIETA = 'http://localhost:4200/dietas'

  constructor(private http: HttpClient) { }

  listarDieta(): Observable<IDieta[]>{
    return this.http.get<IDieta[]>(this.API_DIETA)
  }

  cadastrarDieta(dieta: IDieta): Observable<IDieta> {
  return this.http.post<IDieta>(this.API_DIETA, dieta)
}
}
