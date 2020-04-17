import { Injectable } from '@angular/core';
import { ICrudService } from '../icrud-service';
import { Hospital } from './hospital';
import { RootURLS } from '../root-urls';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService implements ICrudService<Hospital> {

  constructor(private http: HttpClient) {
    this.ReponseUrl = RootURLS.getUrl("Hospital");
  }
  ReponseUrl: string;
  RepByDm: Hospital[];
  getAll(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.ReponseUrl);
  }
  getById(payload: string): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.ReponseUrl}/${payload}`);
  }
  add(payload: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(this.ReponseUrl, payload);
  }
  update(hospitalCat: Hospital): Observable<Hospital> {
    return this.http.patch<Hospital>(
      `${this.ReponseUrl}/${hospitalCat.id}`,
      hospitalCat
    );
  }
  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }
}
