import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { doctorCat } from './doctorCat.module';


@Injectable({
    providedIn :"root"
})

export class DoctorCatService{
    private DoctorCatUrl = "http://144.91.76.98:5002/api/DoctorCategory"
  RepByDm: doctorCat[];
    constructor( private  http : HttpClient ){}
    getDoctorCat(): Observable<doctorCat[]>{
        return this.http.get<doctorCat[]>(this.DoctorCatUrl);
    }
    getDoctorCatById(payload : number):Observable<doctorCat>{
        return this.http.get<doctorCat>(`${this.DoctorCatUrl}/${payload}`)
    }

}