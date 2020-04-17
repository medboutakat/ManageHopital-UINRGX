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
<<<<<<< HEAD
  getById(payload: string ): Observable<Appointement> {
=======
  getById(payload: string): Observable<Appointement> {
>>>>>>> b34e33f7a4c4eb172af22268917e4117d38f7ed5
    return this.http.get<Appointement>(`${this.ReponseUrl}/${payload}`);
  }
  add(payload: Appointement): Observable<Appointement> {
    return this.http.post<Appointement>(this.ReponseUrl, payload);
  }
  update(hospitalCat: Appointement): Observable<Appointement> {
    return this.http.patch<Appointement>(
      `${this.ReponseUrl}/${hospitalCat.id}`,
      hospitalCat
    );
  }
  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }

}
