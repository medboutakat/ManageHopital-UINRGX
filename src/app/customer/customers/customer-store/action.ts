
import { Store, Action } from '@ngrx/store'
import { Customer as Model } from '../customer.model';
 
export enum CustomerActionType {
    LOAD = "[Model] load Customer",
    LOAD_SUCCESS = "[Model] LOAD Customer Success",
    LOAD_FAIL = "[Model] Load Customer Fail ",
    AddAll = "AddAll",
     
    CREATE = "[Model] Create Customer",
    CREATE_SUCCESS = "[Model] Create Customer Success",
    CREATE_FAIL = "[Model] Create Customer Fail ",

    UPDATE = "[Model] Update Customer",
    UPDATE_SUCCESS = "[Model] Update Customer Success",
    UPDATE_FAIL = "[Model] Update Customer Fail ",

    DELETE= "[Model] Delete Customer",
    DELETE_SUCCESS = "[Model] Delete Customer Success",
    DELETE_FAIL = "[Model] Delete Customer Fail ",
}

export class Load implements Action{
    readonly type = CustomerActionType.LOAD
}
export class LoadSuccess implements Action{
    readonly type = CustomerActionType.LOAD_SUCCESS;

 constructor(public payload: Model[]){ }

}
export class LoadFail implements Action{
    readonly type = CustomerActionType.LOAD_FAIL
    constructor(public payload: string){}
} 

// Add Customeregory

export class Create implements Action{
    readonly type = CustomerActionType.CREATE;
 constructor(public payload: Model){}

}
export class CreateSuccess implements Action{
    readonly type = CustomerActionType.CREATE_SUCCESS;
    constructor(public payload: Model){}
}
export class CreateFail implements Action{
    readonly type = CustomerActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory
export class Update implements Action{
    readonly type = CustomerActionType.UPDATE;
    constructor(public payload: Model){     
       console.log("Action Update",payload);
    }
   }
   
   export class UpdateSuccess implements Action{
    readonly type = CustomerActionType.UPDATE_SUCCESS;
    constructor(public payload: Model){        
       console.log("Action update success=>",payload);
    }
   }
   
   export class UpdateFail implements Action{
    readonly type = CustomerActionType.UPDATE_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
   }


// delete Customeregory

export class Delete implements Action{
    readonly type = CustomerActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteSuccess implements Action{
    readonly type = CustomerActionType.DELETE_SUCCESS;

    constructor(public payload: string){
       console.log("Action delete success",payload);
    }
}

export class DeleteFail implements Action{
    readonly type = CustomerActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
}

export type CustomAction=
 Load | 
 LoadSuccess |
 LoadFail
// CreateCustomer
 |Create
 |CreateSuccess
 |CreateFail
 // DeleteCustomer
 |Delete
 |DeleteSuccess
 |DeleteFail
 //  UpdateCustomer
 |Update
 |UpdateSuccess
 |UpdateFail