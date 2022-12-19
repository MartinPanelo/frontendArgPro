import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { acercade } from '../modelos/modelo.acerca';

@Injectable({
  providedIn: 'root',
})
export class AcercadeService {
  URL = 'https://backedargproprivado-production.up.railway.app/acerca/'; // url de la API

  constructor(private http: HttpClient) {}

  public getdato(): Observable<acercade[]> {
    return this.http.get<acercade[]>(this.URL + 'recibir');
  }

  public detail(id: number): Observable<acercade> {
    return this.http.get<acercade>(this.URL + `detail/${id}`);
  }
  public save(vacerca: acercade): Observable<any> {
    return this.http.post<any>(this.URL + 'crear', vacerca);
  }

  public update(id: number, acerca: acercade): Observable<any> {
    return this.http.put<any>(this.URL + 'editar/1', acerca);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(this.URL + `borrar/${id}`);
  }
}
