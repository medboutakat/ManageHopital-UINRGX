
import { Store, Action } from '@ngrx/store'
import { Hospital } from '../hospital.model';

 
export enum HospitalActionType {
    LOAD_Hospital = "[Hospital] load Hospital",
    LOAD_Hospital_SUCCESS = "[Hospital] LOAD Hospital Success",
    LOAD_Hospital_FAIL = "[Hospital] Load Hospital Fail ",
    AddAll = "AddAll"
}

export class LoadHospital implements Action{
    readonly type = HospitalActionType.LOAD_Hospital
}
export class LoadHospitalSuccess implements Action{
    readonly type = HospitalActionType.LOAD_Hospital_SUCCESS;

 constructor(public payload: Hospital[]){ }

}
export class LoadHospitalFail implements Action{
    readonly type = HospitalActionType.LOAD_Hospital_FAIL
    constructor(public payload: string){}
}

export type HospitalAction= LoadHospital| LoadHospitalSuccess | LoadHospitalFail;