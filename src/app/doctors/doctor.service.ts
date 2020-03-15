import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Doctor } from './doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  ROOT_URL = "http://144.91.76.98:5002/api/doctor/"
  constructor(private http:HttpClient){}
  //get
  getDoctors(){
      return this.http.get<Doctor[]>(this.ROOT_URL)
  }
  // get/{id}
  getDoctorById(id){
      return this.http.get<Doctor>(this.ROOT_URL+id)
  }
  //Post
  postDoctor(doctor:Doctor){
      
      const headers = new HttpHeaders().set('content-type', 'application/json');
  
      var body = {
          id:doctor.id, firstName: doctor.firstName ,lastname: doctor.lastName,
           sexe: doctor.sexe, contactId: doctor.contactId
      }
      console.log('Doctor in service dunc : ',body)
      console.log(this.ROOT_URL);
      return this.http.post<Doctor>(this.ROOT_URL, body, { headers })
  }
  // createCustomer(payload: Doctor): Observable<Doctor> {
  //     console.log("from service : ",payload)
  //     return this.http.post<Doctor>(this.ROOT_URL, payload);
  // }
//put
  update(doctor: Doctor) {
      const params = new HttpParams().set('ID', doctor.id+'');
      const headers = new HttpHeaders().set('content-type', 'application/json');
      var body = {
        id:doctor.id, firstName: doctor.firstName ,lastname: doctor.lastName,
         sexe: doctor.sexe, contactId: doctor.contactId
      }
      return this.http.put<Doctor>(this.ROOT_URL + doctor.id , body, { headers, params })
  }
  //delete/{id}
  delete(id:number) {
      console.log("service delete")
      const params = new HttpParams().set('ID',id+'');
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this.http.delete<Doctor>(this.ROOT_URL + id)
  }
}
