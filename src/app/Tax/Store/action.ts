
import { Store, Action } from '@ngrx/store'
import { Tax as Model } from '../tax.Module';
 
export enum TaxActionType {
    LOAD = "[Model] load Tax",
    LOAD_SUCCESS = "[Model] LOAD Tax Success",
    LOAD_FAIL = "[Model] Load Tax Fail ",
    AddAll = "AddAll",
     
    CREATE = "[Model] Create Tax",
    CREATE_SUCCESS = "[Model] Create Tax Success",
    CREATE_FAIL = "[Model] Create Tax Fail ",

    UPDATE = "[Model] Update Tax",
    UPDATE_SUCCESS = "[Model] Update Tax Success",
    UPDATE_FAIL = "[Model] Update Tax Fail ",

    DELETE= "[Model] Delete Tax",
    DELETE_SUCCESS = "[Model] Delete Tax Success",
    DELETE_FAIL = "[Model] Delete Tax Fail ",
}

export class Load implements Action{
    readonly type = TaxActionType.LOAD
}
export class LoadSuccess implements Action{
    readonly type = TaxActionType.LOAD_SUCCESS;

 constructor(public payload: Model[]){ }

}
export class LoadFail implements Action{
    readonly type = TaxActionType.LOAD_FAIL
    constructor(public payload: string){}
} 

// Add HospitalCategory

export class Create implements Action{
    readonly type = TaxActionType.CREATE;
 constructor(public payload: Model){}

}
export class CreateSuccess implements Action{
    readonly type = TaxActionType.CREATE_SUCCESS;
    constructor(public payload: Model){}
}
export class CreateFail implements Action{
    readonly type = TaxActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory
export class Update implements Action{
    readonly type = TaxActionType.UPDATE;
    constructor(public payload: Model){     
       console.log("Action Update",payload);
    }
   }
   
   export class UpdateSuccess implements Action{
    readonly type = TaxActionType.UPDATE_SUCCESS;
    constructor(public payload: Model){        
       console.log("Action update success=>",payload);
    }
   }
   
   export class UpdateFail implements Action{
    readonly type = TaxActionType.UPDATE_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
   }


// delete HospitalCategory

export class Delete implements Action{
    readonly type = TaxActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteSuccess implements Action{
    readonly type = TaxActionType.DELETE_SUCCESS;

    constructor(public payload: string){
       console.log("Action delete success",payload);
    }
}

export class DeleteFail implements Action{
    readonly type = TaxActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
}

export type TaxAction=
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