import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RootURLS } from 'src/app/root-urls';
import { Hospital } from '../../hospital.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    ReponseUrl :string;
  constructor(private httpClient: HttpClient) {
    this.ReponseUrl=RootURLS.getUrl("Hospital/UpdateImages");
  }

  public uploadFile(file: File): Observable<HttpEvent<{}>> {

    const formData = new FormData();

    formData.append('ImageProfileForm', file, file.name);
    formData.append('ImageCoverForm', file, file.name);

    const options = {
      reportProgress: true
    };

    const req = new HttpRequest(
      'PUT',
      `${this.ReponseUrl}`,
      formData,
      options
    );
    return this.httpClient.request(req);
  }

  updateImages(payloadId: string,payloadData: FormData): Observable<Hospital> {
    console.log("service update",payloadId)

    return this.httpClient.put<Hospital>(
      `${this.ReponseUrl}/${payloadId}`,
      payloadData
    );
  }
}
