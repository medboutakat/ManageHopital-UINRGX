import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Doctor } from './doctor.model';
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService implements ICrudService<Doctor>{
  constructor(private http: HttpClient) {
    this.ReponseUrl = RootURLS.getUrl("doctor");
  }
  ReponseUrl: string;
  RepByDm: Doctor[];
  getAll() {
    return this.http.get<Doctor[]>(this.ReponseUrl);
  }
  getById(payload: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.ReponseUrl}/${payload}`);
  }
  add(payload: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.ReponseUrl, payload);
  }
  update(doctor: Doctor): Observable<Doctor> {
    return this.http.patch<Doctor>(
      `${this.ReponseUrl}/${doctor.id}`,
      doctor
    );
  }
  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }
}
