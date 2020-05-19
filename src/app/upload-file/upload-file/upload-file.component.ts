import { Component, OnInit, Input } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as fromFileUploadState from "../store/state";
import * as fromFileUploadActions from "../store/Action";
import * as fromFileUploadSelectors from "../store/selector";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.css"],
})
export class UploadFileComponent implements OnInit {
  completed$: Observable<boolean>;
  progress$: Observable<number>;
  error$: Observable<string>;
  isInProgress$: Observable<boolean>;
  isReady$: Observable<boolean>;
  hasFailed$: Observable<boolean>;

  constructor(private store$: Store<fromFileUploadState.State>) {}

  @Input() objectId: string;
  @Input() fileName: string;

  ngOnInit() {
    this.completed$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileCompleted)
    );

    this.progress$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileProgress)
    );

    this.error$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileError)
    );

    this.isInProgress$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileInProgress)
    );

    this.isReady$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileReady)
    );

    this.hasFailed$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileFailed)
    );
  }

  uploadFile(event: any) {
    const files: FileList = event.target.files;
    const file = files.item(0);
    var payload = {
      file: file,
      productId: this.objectId,
      name: this.fileName,
    };
    console.log("Component : uploadFile", payload);

    if(payload.productId==environment.EmptyGuid){   
      this.store$.dispatch(
    new fromFileUploadActions.UploadRequestAction(payload)
      )
    }
    // clear the input form
    event.srcElement.value = null;
  }
 
  resetUpload() {
    this.store$.dispatch(new fromFileUploadActions.UploadResetAction());
  }

  cancelUpload() {
    this.store$.dispatch(new fromFileUploadActions.UploadCancelAction());
  }
}
