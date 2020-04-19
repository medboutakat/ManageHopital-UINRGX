import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs"; 
import { ICrudService } from '../icrud-service';
import { RootURLS } from '../root-urls';
import { Invoice } from './invoice-model';

@Injectable({
  providedIn: "root",
})
export class InvoiceService implements ICrudService<Invoice>{

  ReponseUrl: string;

  RepByDm: Invoice[];

  constructor(private http: HttpClient) {
    this.ReponseUrl=RootURLS.getUrl("Invoice");
  }

  getAll(): Observable<Invoice[]> {
    console.log("helo")
    return this.http.get<Invoice[]>(this.ReponseUrl);
  }

  getById(payload: string): Observable<Invoice> {
    return this.http.get<Invoice>(this.ReponseUrl+'/'+payload);
  }

  add(payload: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.ReponseUrl, payload);
  }

  // update(payload: Invoice): Observable<Invoice> {
  //   console.log('payload from service : ',payload)
  //   return this.http.patch<Invoice>(
  //     `${this.ReponseUrl}/${payload.id}`,
  //     payload
  //   );
  // }

  update(payload: Invoice) {
     console.log('payload from service : ',payload)

    const params = new HttpParams().set('ID', payload.id+'');
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      code: payload.code, date: payload.date, expedition: payload.expedition, livraison: payload.livraison,
      remise: payload.remise,totalAmont:payload.totalAmont,invoiceDetails:payload.invoiceDetails,id: payload.id
    }
    return this.http.put<Invoice>(`${this.ReponseUrl}/${payload.id}`, body, { headers, params })
  }

  delete(payload: string) {
    return this.http.delete(`${this.ReponseUrl}/${payload}`);
  } 
}
