
import { Store, Action } from '@ngrx/store'
import { CustomerCat as Model } from '../customer-cat.model';
 
export enum CustomerCatActionType {
    LOAD = "[Model] load CustomerCat",
    LOAD_SUCCESS = "[Model] LOAD CustomerCat Success",
    LOAD_FAIL = "[Model] Load CustomerCat Fail ",
    AddAll = "AddAll",
     
    CREATE = "[Model] Create CustomerCat",
    CREATE_SUCCESS = "[Model] Create CustomerCat Success",
    CREATE_FAIL = "[Model] Create CustomerCat Fail ",

    UPDATE = "[Model] Update CustomerCat",
    UPDATE_SUCCESS = "[Model] Update CustomerCat Success",
    UPDATE_FAIL = "[Model] Update CustomerCat Fail ",

    DELETE= "[Model] Delete CustomerCat",
    DELETE_SUCCESS = "[Model] Delete CustomerCat Success",
    DELETE_FAIL = "[Model] Delete CustomerCat Fail ",
}

export class Load implements Action{
    readonly type = CustomerCatActionType.LOAD
}
export class LoadSuccess implements Action{
    readonly type = CustomerCatActionType.LOAD_SUCCESS;

 constructor(public payload: Model[]){ }

}
export class LoadFail implements Action{
    readonly type = CustomerCatActionType.LOAD_FAIL
    constructor(public payload: string){}
} 

// Add HospitalCategory

export class Create implements Action{
    readonly type = CustomerCatActionType.CREATE;
 constructor(public payload: Model){}

}
export class CreateSuccess implements Action{
    readonly type = CustomerCatActionType.CREATE_SUCCESS;
    constructor(public payload: Model){}
}
export class CreateFail implements Action{
    readonly type = CustomerCatActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory
export class Update implements Action{
    readonly type = CustomerCatActionType.UPDATE;
    constructor(public payload: Model){     
       console.log("Action Update",payload);
    }
   }
   
   export class UpdateSuccess implements Action{
    readonly type = CustomerCatActionType.UPDATE_SUCCESS;
    constructor(public payload: Model){        
       console.log("Action update success=>",payload);
    }
   }
   
   export class UpdateFail implements Action{
    readonly type = CustomerCatActionType.UPDATE_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
   }


// delete HospitalCategory

export class Delete implements Action{
    readonly type = CustomerCatActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteSuccess implements Action{
    readonly type = CustomerCatActionType.DELETE_SUCCESS;

    constructor(public payload: string){
       console.log("Action delete success",payload);
    }
}

export class DeleteFail implements Action{
    readonly type = CustomerCatActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
}

export type CustomerCatction=
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