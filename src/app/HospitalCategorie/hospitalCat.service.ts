import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HospitalCat } from './hospitalCat.model';


@Injectable({
    providedIn :"root"
})

export class HospitalCatService{
    private ReponseUrl = "http://144.91.76.98:5002/api/HospitalCategory"
  RepByDm: HospitalCat[];
    constructor( private  http : HttpClient ){}
    getHospitalCats(): Observable<HospitalCat[]>{
        return this.http.get<HospitalCat[]>(this.ReponseUrl);
    }
    getHospitalCatById(payload : number):Observable<HospitalCat>{
        return this.http.get<HospitalCat>(`${this.ReponseUrl}/${payload}`)
    }
    createHospitalCat(payload: HospitalCat): Observable<HospitalCat> {
        return this.http.post<HospitalCat>(this.ReponseUrl, payload);
      }

      updateHospitalCat(hospitalCat: HospitalCat): Observable<HospitalCat> {
        return this.http.patch<HospitalCat>(
          `${this.ReponseUrl}/${hospitalCat.id}`,
          hospitalCat
        );
      }

      deleteHospitalCat(payload: string) {
        return this.http.delete(`${this.ReponseUrl}/${payload}`);
      }

}