import { Action } from '@ngrx/store'
import { Appointement } from '../appointement.model'

export enum AppointementActionTypes {
    LOAD_APPOINTEMENTS = "[appointement] Load Appointements",
    LOAD_APPOINTEMENTS_SUCCESS = "[appointement] Load Appointements Success",
    LOAD_APPOINTEMENTS_FAILED = "[appointement] Load Appointements Failed",
    DELETE_APPOINTEMENT = "[appointement] Delete Appointements",
    DELETE_APPOINTEMENT_SUCCESS = "[appointement] Delete Appointements Success",
    DELETE_APPOINTEMENT_FAIL = "[appointement] Delete Appointements Fail",
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
export type Action =
    LoadAppointements
    | LoadAppointementsSuccess
    | LoadAppointementsFailed
    | DeleteAppointement
    | DeleteAppointementSuccess
    | DeleteAppointementFail