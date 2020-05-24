import { Action } from '@ngrx/store'
import { Doctor } from '../doctor.model'
import { Update } from '@ngrx/entity'
import { Operation } from 'src/app/operations/operation'

export enum DoctorActionTypes {
    //get all
    GET_DOCTORS = "[Doctor] get",
    GET_DOCTORS_SECCESS = "[Doctor] get Seccess",
    GET_DOCTORS_FAIL = "[Doctor] get failed",
    //get one actions
    GET_DOCTOR = "[Doctor] get one",
    GET_DOCTOR_SECCESS = "[Doctor] get one seccess",
    GET_DOCTOR_FAIL = "[Doctor] get one fail",
    // delete Doctor
    DELETE_DOCTOR = "[Doctor] delete doctor",
    DELETE_DOCTOR_SUCCESS = "[Doctor] delete Doctor success",
    DELETE_DOCTOR_FAIL = "[Doctor] delete doctor fail",
    // add Doctor 
    ADD_DOCTOR = "[Doctor] add doctor",
    ADD_DOCTOR_SUCCESS = "[Doctor] add Doctor success",
    ADD_DOCTOR_FAIL = "[Doctor] add doctor fail",
    // update Doctor
    UPDATE_DOCTOR = "[Doctor] Update doctor",
    UPDATE_DOCTOR_SUCCESS = "[Doctor] Update doctor Success",
    UPDATE_DOCTOR_FAIL = "[Doctor] Update doctor Fail ",
}

//get
export class getDoctor implements Action {
    readonly type = DoctorActionTypes.GET_DOCTORS
    constructor() { }
}
export class getDoctorSeccess implements Action {
    readonly type = DoctorActionTypes.GET_DOCTORS_SECCESS
    constructor(public payload: Doctor[]) { }
}
export class getDoctorFail implements Action {
    readonly type = DoctorActionTypes.GET_DOCTORS_FAIL
    constructor(public payload: string) { }
}
//get one
export class getOneDoctor implements Action {
    readonly type = DoctorActionTypes.GET_DOCTOR
    constructor(public payload: number) { }
}
export class getOneDoctorSeccess implements Action {
    readonly type = DoctorActionTypes.GET_DOCTOR_SECCESS
    constructor(public payload: Doctor) { }
}
export class getOneDoctorFail implements Action {
    readonly type = DoctorActionTypes.GET_DOCTOR_FAIL
    constructor(public payload: string) { }
}
export class DeleteDoctor implements Action {
    readonly type = DoctorActionTypes.DELETE_DOCTOR;

    constructor(public payload) { }
}

export class DeleteDoctorSuccess implements Action {
    readonly type = DoctorActionTypes.DELETE_DOCTOR_SUCCESS;

    constructor(public payload) { }
}

export class DeleteDoctorFail implements Action {
    readonly type = DoctorActionTypes.DELETE_DOCTOR_FAIL;

    constructor(public payload: string) { }
}
export class CreateDoctor implements Action {
    readonly type = DoctorActionTypes.ADD_DOCTOR;

    constructor(public payload: Doctor) { }
}

export class CreateDoctorSuccess implements Action {
    readonly type = DoctorActionTypes.ADD_DOCTOR_SUCCESS;

    constructor(public payload: Doctor) { }
}

export class CreateDoctorFail implements Action {
    readonly type = DoctorActionTypes.ADD_DOCTOR_FAIL;

    constructor(public payload: string) { }
}

export class UpdateDoctor implements Action {
    readonly type = DoctorActionTypes.UPDATE_DOCTOR;
    constructor(public payload: Doctor) { 
        console.log("UpdateDoctor",payload)
    }
}

export class UpdateDoctorSuccess implements Action {
    readonly type = DoctorActionTypes.UPDATE_DOCTOR_SUCCESS;
    constructor(public payload: Doctor) { }
}

export class UpdateDoctorCatFail implements Action {
    readonly type = DoctorActionTypes.UPDATE_DOCTOR_FAIL
    constructor(public payload: string) { }
}

export type CustomAction = getDoctorSeccess
    | getDoctor
    | getDoctorFail
    | getOneDoctor
    | getOneDoctorSeccess
    | getOneDoctorFail
    | DeleteDoctor
    | DeleteDoctorSuccess
    | DeleteDoctorFail
    | CreateDoctor
    | CreateDoctorSuccess
    | CreateDoctorFail
    | UpdateDoctor
    | UpdateDoctorSuccess
    | UpdateDoctorCatFail