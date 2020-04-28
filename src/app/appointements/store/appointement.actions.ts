import { Action } from '@ngrx/store'
import { Appointement } from '../appointement.model'

export enum AppointementActionTypes {
    LOAD_APPOINTEMENTS = "[appointement] Load Appointements",
    LOAD_APPOINTEMENTS_SUCCESS = "[appointement] Load Appointements Success",
    LOAD_APPOINTEMENTS_FAILED = "[appointement] Load Appointements Failed",

    DELETE_APPOINTEMENT = "[appointement] Delete Appointements",
    DELETE_APPOINTEMENT_SUCCESS = "[appointement] Delete Appointements Success",
    DELETE_APPOINTEMENT_FAIL = "[appointement] Delete Appointements Fail",

    CREATE_APPOINTEMENT = "[appointement] Create Appointements",
    CREATE_APPOINTEMENT_SUCCESS = "[appointement] Create Appointements Success",
    CREATE_APPOINTEMENT_FAIL = "[appointement] Create Appointements Fail",
 
    
  UPDATE = "[appointement] Update Hospital",
  UPDATE_SUCCESS = "[appointement] Update Hospital Success",
  UPDATE_FAIL = "[appointement] Update Hospital Fail ",

}
export class LoadAppointements implements Action {
    readonly type = AppointementActionTypes.LOAD_APPOINTEMENTS
    constructor() { }
}
export class LoadAppointementsSuccess implements Action {
    readonly type = AppointementActionTypes.LOAD_APPOINTEMENTS_SUCCESS
    constructor(public playload: Appointement[]) {
    }
}
export class LoadAppointementsFailed implements Action {
    readonly type = AppointementActionTypes.LOAD_APPOINTEMENTS_FAILED
    constructor(public playload: string) { }
}

export class DeleteAppointement implements Action {
    readonly type = AppointementActionTypes.DELETE_APPOINTEMENT;

    constructor(public payload) { }
}

export class DeleteAppointementSuccess implements Action {
    readonly type = AppointementActionTypes.DELETE_APPOINTEMENT_SUCCESS;

    constructor(public payload) { }
}

export class DeleteAppointementFail implements Action {
    readonly type = AppointementActionTypes.DELETE_APPOINTEMENT_FAIL;

    constructor(public payload: string) { }
}
export class CreateAppointement implements Action {
    readonly type = AppointementActionTypes.CREATE_APPOINTEMENT;

    constructor(public payload: Appointement) { }
}

export class CreateAppointementSuccess implements Action {
    readonly type = AppointementActionTypes.CREATE_APPOINTEMENT_SUCCESS;

    constructor(public payload: Appointement) { }
}

export class CreateAppointementFail implements Action {
    readonly type = AppointementActionTypes.CREATE_APPOINTEMENT_FAIL;

    constructor(public payload: string) { }
}

//Update
export class UpdateAppointements implements Action {
    readonly type = AppointementActionTypes.UPDATE;
    constructor(public payload: Appointement) {
      console.log("Action Update", payload);
    }
  }
  export class UpdateAppointementsSuccess implements Action {
    readonly type = AppointementActionTypes.UPDATE_SUCCESS;
    constructor(public payload: Appointement) {
      console.log("Action update success=>", payload);
    }
  }
  
  export class UpdateAppointementsFail implements Action {
    readonly type = AppointementActionTypes.UPDATE_FAIL;
    constructor(public payload: string) {
      console.log("Action update fail", payload);
    }
  }
export type Action =
    LoadAppointements
    | LoadAppointementsSuccess
    | LoadAppointementsFailed
    | DeleteAppointement
    | DeleteAppointementSuccess
    | DeleteAppointementFail
    | CreateAppointement
    | CreateAppointementSuccess
    | CreateAppointementFail
    | UpdateAppointements
    | UpdateAppointementsSuccess
    | UpdateAppointementsFail