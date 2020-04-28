import { Injectable } from '@angular/core';
import { ICrudService } from '../icrud-service';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RootURLS } from '../root-urls';
import { FormBuilder, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements ICrudService<Contact> {
  constructor(private http: HttpClient ) {
    this.ReponseUrl = RootURLS.getUrl("contact");
  }
  ReponseUrl: string;
  RepByDm: Contact[];
  getAll(): import("rxjs").Observable<Contact[]> {
    throw new Error("Method not implemented.");
  }
  getById(payload: string): import("rxjs").Observable<Contact> {
    throw new Error("Method not implemented.");
  }
  add(payload: Contact): import("rxjs").Observable<Contact> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      id: payload.id, email: payload.email, phone1: payload.phone1,
      adress1: payload.adress1, cityId: payload.cityId, phone2: payload.phone2, fax: payload.fax, adress2: payload.adress2,
      whatsApp: payload.whatsApp, other: payload.other
    }
    return this.http.post<Contact>(this.ReponseUrl, body, { headers })
  }
  update(hospitalCat: Contact): import("rxjs").Observable<Contact> {
    throw new Error("Method not implemented.");
  }
  delete(payload: string) {
    throw new Error("Method not implemented.");
  }

 
}
