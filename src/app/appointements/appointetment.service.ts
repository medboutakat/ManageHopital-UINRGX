import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Appointement } from './appointement.model';

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
  // update(Appointements: Appointement): Observable<Appointement> {
  //   return this.http.patch<Appointement>(
  //     `${this.ReponseUrl}/${Appointements.id}`,
  //     Appointements
  //   );
  // }
  update(payload: Appointement) {
    console.log('payload from service : ',payload)

   const params = new HttpParams().set('ID', payload.id+'');
   const headers = new HttpHeaders().set('content-type', 'application/json');
   var body = {
    identityNo: payload.identityNo, assurance: payload.assurance, id: payload.id, subject: payload.subject,
    reservationTimeStamp: payload.reservationTimeStamp,hospitalId:payload.hospitalId
   }
   return this.http.put<Appointement>(`${this.ReponseUrl}/${payload.id}`, body, { headers, params })
 }

  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }

}
