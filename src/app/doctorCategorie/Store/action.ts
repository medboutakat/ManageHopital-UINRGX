
import { Store, Action } from '@ngrx/store'
import { doctorCat as Model } from '../doctorCat.module';
 
export enum DoctorCatActionType {
    LOAD = "[Model] load DoctorCat",
    LOAD_SUCCESS = "[Model] LOAD DoctorCat Success",
    LOAD_FAIL = "[Model] Load DoctorCat Fail ",
    AddAll = "AddAll",
     
    CREATE = "[Model] Create DoctorCat",
    CREATE_SUCCESS = "[Model] Create DoctorCat Success",
    CREATE_FAIL = "[Model] Create DoctorCat Fail ",

    UPDATE = "[Model] Update DoctorCat",
    UPDATE_SUCCESS = "[Model] Update DoctorCat Success",
    UPDATE_FAIL = "[Model] Update DoctorCat Fail ",

    DELETE= "[Model] Delete DoctorCat",
    DELETE_SUCCESS = "[Model] Delete DoctorCat Success",
    DELETE_FAIL = "[Model] Delete DoctorCat Fail ",
}

export class Load implements Action{
    readonly type = DoctorCatActionType.LOAD
}
export class LoadSuccess implements Action{
    readonly type = DoctorCatActionType.LOAD_SUCCESS;

 constructor(public payload: Model[]){ }

}
export class LoadFail implements Action{
    readonly type = DoctorCatActionType.LOAD_FAIL
    constructor(public payload: string){}
} 

// Add HospitalCategory

export class Create implements Action{
    readonly type = DoctorCatActionType.CREATE;
 constructor(public payload: Model){}

}
export class CreateSuccess implements Action{
    readonly type = DoctorCatActionType.CREATE_SUCCESS;
    constructor(public payload: Model){}
}
export class CreateFail implements Action{
    readonly type = DoctorCatActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory
export class Update implements Action{
    readonly type = DoctorCatActionType.UPDATE;
    constructor(public payload: Model){     
       console.log("Action Update",payload);
    }
   }
   
   export class UpdateSuccess implements Action{
    readonly type = DoctorCatActionType.UPDATE_SUCCESS;
    constructor(public payload: Model){        
       console.log("Action update success=>",payload);
    }
   }
   
   export class UpdateFail implements Action{
    readonly type = DoctorCatActionType.UPDATE_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
   }


// delete HospitalCategory

export class Delete implements Action{
    readonly type = DoctorCatActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteSuccess implements Action{
    readonly type = DoctorCatActionType.DELETE_SUCCESS;

    constructor(public payload: string){
       console.log("Action delete success",payload);
    }
}

export class DeleteFail implements Action{
    readonly type = DoctorCatActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
}

export type DoctorCatction=
 Load | 
 LoadSuccess |
 LoadFail
// CreateHospitalCat
 |Create
 |CreateSuccess
 |CreateFail
 // DeleteHospitalCat
 |Delete
 |DeleteSuccess
 |DeleteFail
 //  UpdateHospitalCat
 |Update
 |UpdateSuccess
 |UpdateFail