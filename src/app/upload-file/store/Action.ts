 import { Action } from '@ngrx/store';

export enum ActionTypes {
  UPLOAD_REQUEST = '[File Upload Form] Request',
  UPLOAD_CANCEL = '[File Upload Form] Cancel',
  UPLOAD_RESET = '[File Upload Form] Reset',
  UPLOAD_STARTED = '[File Upload API] Started',
  UPLOAD_PROGRESS = '[File Upload API] Progress',
  UPLOAD_FAILURE = '[File Upload API] Failure',
  UPLOAD_COMPLETED = '[File Upload API] Completed'
}

export class UploadRequestAction implements Action {
  readonly type = ActionTypes.UPLOAD_REQUEST;
  constructor(public payload: { file: File,name:string,productId:string}) {
    console.log("UploadRequestAction",payload)
  }
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
  constructor(public payload: { progress: number }) {
    console.log("UploadProgressAction",payload)
  }
}

export class UploadFailureAction implements Action {
  readonly type = ActionTypes.UPLOAD_FAILURE;
  constructor(public payload: { error: string }) {
      console.log("UploadFailureAction",payload)
  }
}

export class UploadCompletedAction implements Action {
  readonly type = ActionTypes.UPLOAD_COMPLETED;  
  constructor() {    
      console.log("UploadCompletedAction")    
  }
}

export type Actions =
  | UploadRequestAction
  | UploadCancelAction
  | UploadResetAction
  | UploadStartedAction
  | UploadProgressAction
  | UploadFailureAction
  | UploadCompletedAction;
