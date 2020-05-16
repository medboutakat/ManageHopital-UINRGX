import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RootURLS } from 'src/app/root-urls';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    ReponseUrl :string;
  constructor(private httpClient: HttpClient) {
    this.ReponseUrl=RootURLS.getUrl("/api/ProductImage");
  }

  public uploadFile(file: File,productId:string): Observable<HttpEvent<{}>> {

    const formData = new FormData();

    formData.append('ImageProfileForm', file, file.name);
    formData.append('ImageCoverForm', file, file.name);

    const options = {
      reportProgress: true
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
