import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from './hospital.model';
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';



@Injectable({
    providedIn :"root"
})

export class HospitalService implements ICrudService<Hospital>{

  ReponseUrl: string;

  RepByDm: Hospital[];
  RepByDmm: Hospital;

    constructor( private  http : HttpClient ){
    this.ReponseUrl=RootURLS.getUrl("Hospital");

    }
    getAll(): Observable<Hospital[]> {
      return this.http.get<Hospital[]>(this.ReponseUrl);
    }
    getById(payload: string): Observable<Hospital> {
      return this.http.get<Hospital>(`${this.ReponseUrl}/${payload}`);
    }
    add(payload: Hospital): Observable<Hospital> {

      console.log("service Add",payload)
      return this.http.post<Hospital>(this.ReponseUrl, payload);
    }
  

    update(payload: Hospital): Observable<Hospital> {
      console.log("service update",payload)
  
      return this.http.put<Hospital>(
        `${this.ReponseUrl}/${payload.id}`,
        payload
      );
    }
    delete(payload: string) {
      return this.http.delete(`${this.ReponseUrl}/${payload}`);
    } 


    
    updateImages(payloadId: string,payloadData: FormData): Observable<Hospital> {
      console.log("service update",payloadId)
  
      return this.http.put<Hospital>(
        `${this.ReponseUrl}/${payloadId}`,
        payloadData
      );
    }

}