import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointement } from './appointement.model';
import { Hospital } from './hospital';
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointetmentService implements ICrudService<Appointement> {
  ReponseUrl: string;
  RepByDm: Appointement[];

  constructor(private http: HttpClient) {
    this.ReponseUrl = RootURLS.getUrl("Appointement");
  }
  getAll(): Observable<Appointement[]> {
    return this.http.get<Appointement[]>(this.ReponseUrl);
  }
  getById(payload: string ): Observable<Appointement> {
    return this.http.get<Appointement>(`${this.ReponseUrl}/${payload}`);
  }
  add(payload: Appointement): Observable<Appointement> {
    return this.http.post<Appointement>(this.ReponseUrl, payload);
  }
  update(Appointements: Appointement): Observable<Appointement> {
    return this.http.patch<Appointement>(
      `${this.ReponseUrl}/${Appointements.id}`,
      Appointements
    );
  }
  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }

}
