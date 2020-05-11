import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, takeUntil, mergeMap, tap } from 'rxjs/operators';
import * as fromFileUploadActions from 'src/app/hospitals/upload-file-store/Action';
import { FileUploadService } from './file-service/file.service';
import { Hospital } from '../hospital.model';

@Injectable()
export class UploadFileEffects {
  @Effect()
  uploadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType(fromFileUploadActions.ActionTypes.UPLOAD_REQUEST),
    concatMap(action =>
      this.fileUploadService.uploadFile(action.payload.file).pipe(
        takeUntil(
          this.actions$.pipe(
            ofType(fromFileUploadActions.ActionTypes.UPLOAD_CANCEL)
          )
        ),
        map(event => this.getActionFromHttpEvent(event)),
        // catchError(error => of(this.handleError(error)))
      )
    )
  );
  @Effect()
  UpdateHospitalCat$: Observable<Action> = this.actions$.pipe(
      ofType<fromFileUploadActions.UpdateHospital>(
          fromFileUploadActions.ActionTypes.UPDATE
      ),
      map((Actions : fromFileUploadActions.UpdateHospital)=>Actions.payloadId),
      mergeMap((payloadId : any ,payloadData :any)=>
      this.fileUploadService.updateImages(payloadId,payloadData).pipe(
          map(
              (payloadId : Hospital)=>new fromFileUploadActions.UpdateHospitalSuccess(payloadId)
          ), 
          tap((data) => {
                   console.log(data);
          }),
         catchError(err =>of(new fromFileUploadActions.UpdateHospitalFail(err))
      )
      )
  )); 
  constructor(
    private fileUploadService:FileUploadService,
    private actions$: Actions<fromFileUploadActions.Actions>
  ) {}

  private getActionFromHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return new fromFileUploadActions.UploadStartedAction();
      }
      case HttpEventType.UploadProgress: {
        return new fromFileUploadActions.UploadProgressAction({
          progress: Math.round((100 * event.loaded) / event.total)
        });
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          return new fromFileUploadActions.UploadCompletedAction();
        } else {
          return new fromFileUploadActions.UploadFailureAction({
            error: event.statusText
          });
        }
      }
      default: {
        return new fromFileUploadActions.UploadFailureAction({
          error: `Unknown Event: ${JSON.stringify(event)}`
        });
      }
    }
  }


}
