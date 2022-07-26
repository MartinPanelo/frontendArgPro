import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloSkill } from '../modelos/modelo-skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  URL = 'https://paneloarg.herokuapp.com/skill/';


  constructor(private http: HttpClient) { }

  public getdato(): Observable<ModeloSkill[]> {
    return this.http.get<ModeloSkill[]>(this.URL + 'recibir');
  }

  public detail(id: number): Observable<ModeloSkill> {
    return this.http.get<ModeloSkill>(this.URL + `detail/${id}`);
  }
  public save(item: ModeloSkill): Observable<any> {
    return this.http.post<any>(this.URL + 'crear', item);
  }

  public update(id: number, item: ModeloSkill): Observable<any> {
    return this.http.put<any>(this.URL + `editar/${id}`, item);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(this.URL + `borrar/${id}`);
  }
}
