import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProyecto } from '../modelos/modelo-proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

 
  URL = 'https://backedargproprivado-production.up.railway.app/proyecto/';


  constructor(private http: HttpClient) { }

  public getdato(): Observable<ModeloProyecto[]> {
    return this.http.get<ModeloProyecto[]>(this.URL + 'recibir');
  }

  public detail(id: number): Observable<ModeloProyecto> {
    return this.http.get<ModeloProyecto>(this.URL + `detail/${id}`);
  }
  public save(item: ModeloProyecto): Observable<any> {
    return this.http.post<any>(this.URL + 'crear', item);
  }

  public update(id: number, item: ModeloProyecto): Observable<any> {
    return this.http.put<any>(this.URL + `editar/${id}`, item);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(this.URL + `borrar/${id}`);
  }
}
