import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from './customer.model';
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements ICrudService<Customer>{
  constructor(private http: HttpClient) {
    this.ReponseUrl = RootURLS.getUrl("customer");
  }
  ReponseUrl: string;
  RepByDm: Customer[];
  getAll() {
    return this.http.get<Customer[]>(this.ReponseUrl);
  }
  getById(payload: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.ReponseUrl}/${payload}`);
  }
  add(payload: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.ReponseUrl, payload);
  }
  update(payload: Customer): Observable<Customer> {

    console.log("service update", payload)

    return this.http.put<Customer>(
      `${this.ReponseUrl}/${payload.id}`,
      payload
    );

  }
  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  }
}
