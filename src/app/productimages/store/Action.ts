import { Action } from '@ngrx/store';
import { ProductImage } from './productImg.module';


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
export class UploadRequestAction implements Action {
  readonly type = ActionTypes.UPLOAD_REQUEST;
  constructor(public payload: { file: File,productId:string }) {
    console.log("Update image for product "+payload.productId)
  }
}

export class UploadCancelAction implements Action {
  readonly type = ActionTypes.UPLOAD_CANCEL;
}

export class UploadResetAction implements Action {
  readonly type = ActionTypes.UPLOAD_RESET;
  constructor(public payload: ProductImage) { 
    console.log("Action Create success=>", payload);
  }
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
  | UploadCompletedAction; 
