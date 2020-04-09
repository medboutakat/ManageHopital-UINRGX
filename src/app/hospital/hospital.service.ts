import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from './hospital.model';



@Injectable({
    providedIn :"root"
})

export class HospitalService{
    private HospitalUrl = "http://144.91.76.98:5002/api/Hospital"
  RepByDm: Hospital[];
    constructor( private  http : HttpClient ){}
    getHospitalCats(): Observable<Hospital[]>{
        return this.http.get<Hospital[]>(this.HospitalUrl);
    }
    getHospitalCatById(payload : number):Observable<Hospital>{
        return this.http.get<Hospital>(`${this.HospitalUrl}/${payload}`)
    }
    createHospital(payload: Hospital): Observable<Hospital> {
        return this.http.post<Hospital>(this.HospitalUrl, payload);
      }

      updateHospital(hospital: Hospital): Observable<Hospital> {
        return this.http.patch<Hospital>(
          `${this.HospitalUrl}/${hospital.id}`,
          hospital
        );
      }

      deleteHospital(payload: string) {
        return this.http.delete(`${this.HospitalUrl}/${payload}`);
      }

}