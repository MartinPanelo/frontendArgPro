import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloTallercurso } from '../modelos/modelo-tallercurso';

@Injectable({
  providedIn: 'root'
})
export class TallercursoService {

  URL = 'https://backedargproprivado-production.up.railway.app/tallercurso/';


  constructor(private http: HttpClient) { }

  public getdato(): Observable<ModeloTallercurso[]> {
    return this.http.get<ModeloTallercurso[]>(this.URL + 'recibir');
  }

  public detail(id: number): Observable<ModeloTallercurso> {
    return this.http.get<ModeloTallercurso>(this.URL + `detail/${id}`);
  }
  public save(item: ModeloTallercurso): Observable<any> {
    return this.http.post<any>(this.URL + 'crear', item);
  }

  public update(id: number, item: ModeloTallercurso): Observable<any> {
    return this.http.put<any>(this.URL + `editar/${id}`, item);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(this.URL + `borrar/${id}`);
  }
}
