import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloEducacion } from '../modelos/modelo-educacion';

@Injectable({
  providedIn: 'root'
})
export class SeducacionService {

  URL = 'https://paneloarg.herokuapp.com/educacion/';


  constructor(private http: HttpClient) { }

  public getdato(): Observable<ModeloEducacion[]> {
    return this.http.get<ModeloEducacion[]>(this.URL + 'recibir');
  }

  public detail(id: number): Observable<ModeloEducacion> {
    return this.http.get<ModeloEducacion>(this.URL + `detail/${id}`);
  }
  public save(item: ModeloEducacion): Observable<any> {
    return this.http.post<any>(this.URL + 'crear', item);
  }

  public update(id: number, item: ModeloEducacion): Observable<any> {
    return this.http.put<any>(this.URL + `editar/${id}`, item);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(this.URL + `borrar/${id}`);
  }
}
