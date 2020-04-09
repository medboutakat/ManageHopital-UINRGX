import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointement } from './appointement.model';
import { Hospital } from './hospital';

@Injectable({
  providedIn: 'root'
})
export class AppointetmentService {
  url = "http://144.91.76.98:5002/api/Appointement"
  url2 = "http://144.91.76.98:5002/api/Hospital";
  constructor(private http: HttpClient) { }
  //*********************get all Appointements************************* */
  getAppointements() {
    return this.http.get<Appointement[]>(this.url)
  }
  /**********************Delete Appointement************************************* */
  deleteAppointement(payload) {
    return this.http.delete(`${this.url}/${payload}`);
  }
  /*************************get Hospitals*********************************************** */
  gethospital() {
    return this.http.get<Hospital[]>(this.url2);
  }
  /****************************Add Appointement************************************************* */
  addApps(app: Appointement) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      id: app.id, identityNo: app.identityNo, assurance: app.assurance,
      reservationTimeStamp: app.reservationTimeStamp, subject: app.subject, hospitalId: app.hospitalId,
    }
    return this.http.post<Appointement>(this.url, body, { headers })
  }
}
