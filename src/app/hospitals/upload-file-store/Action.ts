import { Action } from '@ngrx/store';
import { Hospital } from '../hospital.model';

export enum ActionTypes {
  UPLOAD_REQUEST = '[File Upload Form] Request',
  UPLOAD_CANCEL = '[File Upload Form] Cancel',
  UPLOAD_RESET = '[File Upload Form] Reset',
  UPLOAD_STARTED = '[File Upload API] Started',
  UPLOAD_PROGRESS = '[File Upload API] Progress',
  UPLOAD_FAILURE = '[File Upload API] Failure',
  UPLOAD_COMPLETED = '[File Upload API] Completed',

  UPDATE= "[image] Update image",
  UPDATE_SUCCESS = "[image] Update image Success",
  UPDAT_FAIL = "[image] Update image Fail ",

}

export class UpdateHospital implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payloadId: Hospital) {
    console.log("Action Update", payloadId);
  }
}
export class UpdateHospitalSuccess implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payloadId: Hospital) {
    console.log("Action update success=>", payloadId);
  }
}

export class UpdateHospitalFail implements Action {
  readonly type = ActionTypes.UPDAT_FAIL;
  constructor(public payload: string) {
    console.log("Action update fail", payload);
  }
}


export class UploadRequestAction implements Action {
  readonly type = ActionTypes.UPLOAD_REQUEST;
  constructor(public payload: { file: File }) {}
}

export class UploadCancelAction implements Action {
  readonly type = ActionTypes.UPLOAD_CANCEL;
}

export class UploadResetAction implements Action {
  readonly type = ActionTypes.UPLOAD_RESET;
}

export class UploadStartedAction implements Action {
  readonly type = ActionTypes.UPLOAD_STARTED;
}

export class UploadProgressAction implements Action {
  readonly type = ActionTypes.UPLOAD_PROGRESS;
  constructor(public payload: { progress: number }) {}
}

export class UploadFailureAction implements Action {
  readonly type = ActionTypes.UPLOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UploadCompletedAction implements Action {
  readonly type = ActionTypes.UPLOAD_COMPLETED;
}

export type Actions =
  | UploadRequestAction
  | UploadCancelAction
  | UploadResetAction
  | UploadStartedAction
  | UploadProgressAction
  | UploadFailureAction
  | UploadCompletedAction
  | UpdateHospital
  | UpdateHospitalSuccess
  | UpdateHospitalFail;
