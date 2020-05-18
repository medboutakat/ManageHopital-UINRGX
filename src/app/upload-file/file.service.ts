import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { RootURLS } from 'src/app/root-urls'; 

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    ReponseUrl :string;
  constructor(private httpClient: HttpClient) {
    this.ReponseUrl=RootURLS.getUrl("Hospital/UpdateImages");
  }
  
  public uploadFile(file: File,name:string,productId:string): Observable<HttpEvent<{}>> {

    const formData = new FormData();
    formData.append(name, file, file.name);  

    const options = {
      reportProgress: true, 
    };

    const req = new HttpRequest(
      'PUT',
      `${this.ReponseUrl}/`+productId,
      formData,
      options
    );
    return this.httpClient.request(req);
  }
 
}
