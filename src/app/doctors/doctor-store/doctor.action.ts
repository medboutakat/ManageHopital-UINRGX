import { Action } from '@ngrx/store'
import { Doctor } from '../doctor.model'

export enum DoctorActionTypes{
    //get all
    GET_DOCTORS = "[Doctor] get",
    GET_DOCTORS_SECCESS = "[Doctor] get Seccess",
    GET_DOCTORS_FAIL = "[Doctor] get failed",
    //get one actions
    GET_DOCTOR= "[Doctor] get one",
    GET_DOCTOR_SECCESS= "[Doctor] get one seccess",
    GET_DOCTOR_FAIL= "[Doctor] get one fail",
}

//get
export class getDoctor implements Action{
    readonly type= DoctorActionTypes.GET_DOCTORS
    constructor(){}
}
export class getDoctorSeccess implements Action{
    readonly type= DoctorActionTypes.GET_DOCTORS_SECCESS
    constructor(public payload:Doctor[]){}
}
export class getDoctorFail implements Action{
    readonly type= DoctorActionTypes.GET_DOCTORS_FAIL
    constructor(public payload:string){}
}
//get one
export class getOneDoctor implements Action{
    readonly type= DoctorActionTypes.GET_DOCTOR
    constructor(public payload:number){}
}
export class getOneDoctorSeccess implements Action{
    readonly type= DoctorActionTypes.GET_DOCTOR_SECCESS
    constructor(public payload:Doctor){}
}
export class getOneDoctorFail implements Action{
    readonly type= DoctorActionTypes.GET_DOCTOR_FAIL
    constructor(public payload:string){}
}

export type CustomAction = getDoctorSeccess 
| getDoctor
| getDoctorFail
| getOneDoctor
| getOneDoctorSeccess
| getOneDoctorFail