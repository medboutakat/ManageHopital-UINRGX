import { Action } from '@ngrx/store'
import { Appointement } from '../appointement.model'

export enum AppointementActionTypes{
    //get all
    GET_APPOINTEMENTS = "[Appointement] get",
    GET_APPOINTEMENTS_SECCESS = "[Appointement] get Seccess",
    GET_APPOINTEMENTS_FAIL = "[Appointement] get failed",
    //get one actions
    GET_APPOINTEMENT= "[Appointement] get one",
    GET_APPOINTEMENT_SECCESS= "[Appointement] get one seccess",
    GET_APPOINTEMENT_FAIL= "[Appointement] get one fail",
}

//get
export class getAppointement implements Action{
    readonly type= AppointementActionTypes.GET_APPOINTEMENTS
}
export class getAppointementSeccess implements Action{
    readonly type= AppointementActionTypes.GET_APPOINTEMENTS_SECCESS
    constructor(public payload:Appointement[]){}
}
export class getAppointementFail implements Action{
    readonly type= AppointementActionTypes.GET_APPOINTEMENTS_FAIL
    constructor(public payload:string){}
}
//get one
export class getOneAppointement implements Action{
    readonly type= AppointementActionTypes.GET_APPOINTEMENT
    constructor(public payload:number){}
}
export class getOneAppointementSeccess implements Action{
    readonly type= AppointementActionTypes.GET_APPOINTEMENT_SECCESS
    constructor(public payload:Appointement){}
}
export class getOneAppointementFail implements Action{
    readonly type= AppointementActionTypes.GET_APPOINTEMENTS_FAIL
    constructor(public payload:string){}
}

export type CustomAction = getAppointementSeccess 
| getAppointement
| getAppointementFail
| getOneAppointement
| getOneAppointementSeccess
| getOneAppointementFail