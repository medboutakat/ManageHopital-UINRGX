
import { Store, Action } from '@ngrx/store'
import { doctorCat } from '../doctorCat.module';
 
export enum DoctorCatActionType {
    LOAD_DoctorCat = "[DoctorCat] load DoctorCat",
    LOAD_DoctorCat_SUCCESS = "[DoctorCat] LOAD DoctorCat Success",
    LOAD_DoctorCat_FAIL = "[DoctorCat] Load DoctorCat Fail ",
    AddAll = "AddAll",

    
    DELETE_DoctorCat = "[DoctorCat] Delete DoctorCat",
    DELETE_DoctorCat_SUCCESS = "[DoctorCat] Delete DoctorCat Success",
    DELETE_DoctorCat_FAIL = "[DoctorCat] Delete DoctorCat Fail ",
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



// delete HospitalCategory

export class DeleteDoctorCat implements Action{
    readonly type = DoctorCatActionType.DELETE_DoctorCat;
 constructor(public payload: string){}

}
export class DeleteDoctorCatSuccess implements Action{
    readonly type = DoctorCatActionType.DELETE_DoctorCat_SUCCESS;
}

export class DeleteDoctorCatFail implements Action{
    readonly type = DoctorCatActionType.DELETE_DoctorCat_FAIL
    constructor(public payload: string){}
}

export type DoctorCatction=
 LoadDoctorCat | 
 LoadDoctorCatSuccess |
LoadDoctorCatFail
 // DeleteHospitalCat
 |DeleteDoctorCat
 |DeleteDoctorCatSuccess
 |DeleteDoctorCatFail;;