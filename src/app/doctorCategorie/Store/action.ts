
import { Store, Action } from '@ngrx/store'
import { doctorCat } from '../doctorCat.module';
 
export enum DoctorCatActionType {
    LOAD_DoctorCat = "[DoctorCat] load DoctorCat",
    LOAD_DoctorCat_SUCCESS = "[DoctorCat] LOAD DoctorCat Success",
    LOAD_DoctorCat_FAIL = "[DoctorCat] Load DoctorCat Fail ",
    AddAll = "AddAll",
  
    CREATE_DoctorCat = "[DoctorCat] Create DoctorCat",
    CREATE_DoctorCat_SUCCESS = "[DoctorCat] Create DoctorCat Success",
    CREATE_DoctorCat_FAIL = "[DoctorCat] Create DoctorCat Fail ",
    
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


// Add HospitalCategory

export class CreateDoctorCat implements Action{
    readonly type = DoctorCatActionType.CREATE_DoctorCat;
 constructor(public payload: doctorCat){}

}
export class CreateDoctorCatSuccess implements Action{
    readonly type = DoctorCatActionType.CREATE_DoctorCat_SUCCESS;

 constructor(public payload: doctorCat){}

}
export class CreateDoctorCatFail implements Action{
    readonly type = DoctorCatActionType.CREATE_DoctorCat_FAIL
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
// CreateHospitalCat
|CreateDoctorCat
| CreateDoctorCatSuccess
|CreateDoctorCatFail
 // DeleteHospitalCat
 |DeleteDoctorCat
 |DeleteDoctorCatSuccess
 |DeleteDoctorCatFail;;