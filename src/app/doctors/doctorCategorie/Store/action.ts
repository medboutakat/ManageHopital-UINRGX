
import { Store, Action } from '@ngrx/store'
import { doctorCat } from '../doctorCat.module';
 
export enum DoctorCatActionType {
    LOAD_DoctorCat = "[DoctorCat] load DoctorCat",
    LOAD_DoctorCat_SUCCESS = "[DoctorCat] LOAD DoctorCat Success",
    LOAD_DoctorCat_FAIL = "[DoctorCat] Load DoctorCat Fail ",
    AddAll = "AddAll"
}

export class LoadDoctorCat implements Action{
    readonly type = DoctorCatActionType.LOAD_DoctorCat
}
export class LoadDoctorCatSuccess implements Action{
    readonly type = DoctorCatActionType.LOAD_DoctorCat_SUCCESS;

 constructor(public payload: doctorCat[]){

 }

}
export class LoadDoctorCatFail implements Action{
    readonly type = DoctorCatActionType.LOAD_DoctorCat_FAIL
    constructor(public payload: string){}
}

export type DoctorCatction= LoadDoctorCat | LoadDoctorCatSuccess | LoadDoctorCatFail;