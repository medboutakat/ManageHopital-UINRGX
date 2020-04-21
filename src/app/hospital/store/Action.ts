
import { Store, Action } from '@ngrx/store'
import { Hospital } from '../hospital.model';
import { Update } from '@ngrx/entity';

 
export enum HospitalActionType {
    LOAD = "[Hospital] load Hospital",
    LOAD_SUCCESS = "[Hospital] LOAD Hospital Success",
    LOAD_FAIL = "[Hospital] Load Hospital Fail ",
    AddAll = "AddAll",
     
    CREATE = "[Hospital] Create Hospital",
    CREATE_SUCCESS = "[Hospital] Create Hospital Success",
    CREATE_FAIL = "[Hospital] Create Hospital Fail ",

    UPDATE = "[Hospital] Update Hospital",
    UPDATE_SUCCESS = "[Hospital] Update Hospital Success",
    UPDATE_FAIL = "[Hospital] Update Hospital Fail ",

    DELETE= "[Hospital] Delete Hospital",
    DELETE_SUCCESS = "[Hospital] Delete Hospital Success",
    DELETE_FAIL = "[Hospital] Delete Hospital Fail ",
}

export class LoadHospital implements Action{
    readonly type = HospitalActionType.LOAD
}
export class LoadHospitalSuccess implements Action{
    readonly type = HospitalActionType.LOAD_SUCCESS;

 constructor(public payload: Hospital[]){ }

}
export class LoadHospitalFail implements Action{
    readonly type = HospitalActionType.LOAD_FAIL
    constructor(public payload: string){}
}


// Add HospitalCategory

export class CreateHospital implements Action{
    readonly type = HospitalActionType.CREATE;
 constructor(public payload: Hospital){}

}
export class CreateHospitalSuccess implements Action{
    readonly type = HospitalActionType.CREATE_SUCCESS;

 constructor(public payload: Hospital){}

}
export class CreateHospitalFail implements Action{
    readonly type = HospitalActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory

//Update hospitalCategory
export class UpdateHospital implements Action{
    readonly type = HospitalActionType.UPDATE;
    constructor(public payload: Hospital){     
       console.log("Action Update",payload);
    }
   }
   
   export class UpdateHospitalSuccess implements Action{
       readonly type = HospitalActionType.UPDATE_SUCCESS;
       constructor(public payload: Hospital){        
          console.log("Action update success=>",payload);
       }
   }
   
   export class UpdateHospitalFail implements Action{
       readonly type = HospitalActionType.UPDATE_FAIL
       constructor(public payload: string){
          console.log("Action update fail",payload);
       }
   }

// delete HospitalCategory


export class DeleteHospital implements Action{
    readonly type = HospitalActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteHospitalSuccess implements Action{
    readonly type = HospitalActionType.DELETE_SUCCESS;

 constructor(public payload: string){
    console.log("Action delete success",payload);
 }

}
export class DeleteHospitalFail implements Action{
    readonly type = HospitalActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
}
export type HospitalAction=
// LoadHospitalCat
 LoadHospital |
 LoadHospitalSuccess | 
 LoadHospitalFail
// CreateHospitalCat
 |CreateHospital
 | CreateHospitalSuccess
 |CreateHospitalFail
//  UpdateHospitalCat
 |UpdateHospital
 |UpdateHospitalSuccess
 |UpdateHospitalFail
 // DeleteHospitalCat
 |DeleteHospital
 |DeleteHospitalSuccess
 |DeleteHospitalFail;