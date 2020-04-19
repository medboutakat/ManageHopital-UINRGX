
import { Store, Action } from '@ngrx/store'
import { doctorCat } from '../doctorCat.module';
 
export enum DoctorCatActionType {
    LOAD = "[DoctorCat] load DoctorCat",
    LOAD_SUCCESS = "[DoctorCat] LOAD DoctorCat Success",
    LOAD_FAIL = "[DoctorCat] Load DoctorCat Fail ",
    AddAll = "AddAll",
     
    CREATE = "[DoctorCat] Create DoctorCat",
    CREATE_SUCCESS = "[DoctorCat] Create DoctorCat Success",
    CREATE_FAIL = "[DoctorCat] Create DoctorCat Fail ",

    UPDATE = "[DoctorCat] Update DoctorCat",
    UPDATE_SUCCESS = "[DoctorCat] Update DoctorCat Success",
    UPDATE_FAIL = "[DoctorCat] Update DoctorCat Fail ",

    DELETE= "[DoctorCat] Delete DoctorCat",
    DELETE_SUCCESS = "[DoctorCat] Delete DoctorCat Success",
    DELETE_FAIL = "[DoctorCat] Delete DoctorCat Fail ",
}

export class LoadDoctorCat implements Action{
    readonly type = DoctorCatActionType.LOAD
}
export class LoadDoctorCatSuccess implements Action{
    readonly type = DoctorCatActionType.LOAD_SUCCESS;

 constructor(public payload: doctorCat[]){ }

}
export class LoadDoctorCatFail implements Action{
    readonly type = DoctorCatActionType.LOAD_FAIL
    constructor(public payload: string){}
}



// Add HospitalCategory

export class CreateDoctorCat implements Action{
    readonly type = DoctorCatActionType.CREATE;
 constructor(public payload: doctorCat){}

}
export class CreateDoctorCatSuccess implements Action{
    readonly type = DoctorCatActionType.CREATE_SUCCESS;
    constructor(public payload: doctorCat){}
}
export class CreateDoctorCatFail implements Action{
    readonly type = DoctorCatActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory
export class UpdateDoctorCat implements Action{
    readonly type = DoctorCatActionType.UPDATE;
    constructor(public payload: doctorCat){     
       console.log("Action Update",payload);
    }
   }
   
   export class UpdateDoctorCatSuccess implements Action{
    readonly type = DoctorCatActionType.UPDATE_SUCCESS;
    constructor(public payload: doctorCat){        
       console.log("Action update success=>",payload);
    }
   }
   
   export class UpdateDoctorCatFail implements Action{
    readonly type = DoctorCatActionType.UPDATE_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
   }


// delete HospitalCategory

export class DeleteDoctorCat implements Action{
    readonly type = DoctorCatActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteDoctorCatSuccess implements Action{
    readonly type = DoctorCatActionType.DELETE_SUCCESS;

    constructor(public payload: string){
       console.log("Action delete success",payload);
    }
}

export class DeleteDoctorCatFail implements Action{
    readonly type = DoctorCatActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
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
 |DeleteDoctorCatFail
 //  UpdateHospitalCat
 |UpdateDoctorCat
 |UpdateDoctorCatSuccess
 |UpdateDoctorCatFail