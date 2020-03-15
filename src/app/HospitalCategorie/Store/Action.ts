
import { Store, Action } from '@ngrx/store'
import { HospitalCat } from '../hospitalCat.model';
 
export enum HospitalCatActionType {
    LOAD_HospitalCat = "[HospitalCat] load HospitalCat",
    LOAD_HospitalCat_SUCCESS = "[HospitalCat] LOAD HospitalCat Success",
    LOAD_HospitalCat_FAIL = "[HospitalCat] Load HospitalCat Fail ",
    AddAll = "AddAll"
}

export class LoadHospitalCat implements Action{
    readonly type = HospitalCatActionType.LOAD_HospitalCat
}
export class LoadHospitalCatSuccess implements Action{
    readonly type = HospitalCatActionType.LOAD_HospitalCat_SUCCESS;

 constructor(public payload: HospitalCat[]){

 }

}
export class LoadHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.LOAD_HospitalCat_FAIL
    constructor(public payload: string){}
}

export type HospitalCatAction= LoadHospitalCat | LoadHospitalCatSuccess | LoadHospitalCatFail;