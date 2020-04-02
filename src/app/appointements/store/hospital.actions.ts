import { Hospital } from '../hospital'
import { Action } from '@ngrx/store'
export enum HospitalActionTypes {
    LOAD_HOSPITALS = "[hospital] Load Hospitals",
    LOAD_HOSPITALS_SUCCESS = "[hospital] Load Hospitals Success",
    LOAD_HOSPITALS_FAILED = "[hospital] Load Hospitals Failed",
}
export class LoadHospitals implements Action {
    readonly type = HospitalActionTypes.LOAD_HOSPITALS
    constructor() { }
}
export class LoadHospitalsSuccess implements Action {
    readonly type = HospitalActionTypes.LOAD_HOSPITALS_SUCCESS
    constructor(public playload: Hospital[]) {
    }
}
export class LoadHospitalsFailed implements Action {
    readonly type = HospitalActionTypes.LOAD_HOSPITALS_FAILED
    constructor(public playload: string) { }
}
export type Action =
    LoadHospitals
    | LoadHospitalsSuccess
    | LoadHospitalsFailed