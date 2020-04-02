import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Operation } from './operation';
import { OperationCategory } from './operation-category';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  url = "http://144.91.76.98:5002/api/Operation";
  url2 = "http://144.91.76.98:5002/api/OperationCategory";
  constructor(private http: HttpClient) { }
  /*******************get Operations********************************* */
  getOperation() {
    return this.http.get<Operation[]>(this.url);
  }
  /********************delete operation********************************************* */
  deleteOperation(payload) {
    return this.http.delete(`${this.url}/${payload}`);
  }
  /**************************Add Operation******************************************************* */
  addOpp(operation: Operation) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      id: operation.id, date: operation.date, price: operation.price,
      totalStayNight: operation.totalStayNight, operationCategoryId: operation.operationCategoryId
    }
    return this.http.post<Operation>(this.url, body, { headers })
  }
  /***************************getOperationCategory************************************* */
  getOpCategory() {
    return this.http.get<OperationCategory[]>(this.url2);
  }
}
