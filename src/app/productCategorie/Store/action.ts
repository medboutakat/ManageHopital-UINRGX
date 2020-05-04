
import { Store, Action } from '@ngrx/store'
import { productCat as Model } from '../productCat.Module';
 
export enum ProductCatActionType {
    LOAD = "[Model] load ProductCat",
    LOAD_SUCCESS = "[Model] LOAD ProductCat Success",
    LOAD_FAIL = "[Model] Load ProductCat Fail ",
    AddAll = "AddAll",
     
    CREATE = "[Model] Create ProductCat",
    CREATE_SUCCESS = "[Model] Create ProductCat Success",
    CREATE_FAIL = "[Model] Create ProductCat Fail ",

    UPDATE = "[Model] Update ProductCat",
    UPDATE_SUCCESS = "[Model] Update ProductCat Success",
    UPDATE_FAIL = "[Model] Update ProductCat Fail ",

    DELETE= "[Model] Delete ProductCat",
    DELETE_SUCCESS = "[Model] Delete ProductCat Success",
    DELETE_FAIL = "[Model] Delete ProductCat Fail ",
}

export class Load implements Action{
    readonly type = ProductCatActionType.LOAD
}
export class LoadSuccess implements Action{
    readonly type = ProductCatActionType.LOAD_SUCCESS;

 constructor(public payload: Model[]){ }

}
export class LoadFail implements Action{
    readonly type = ProductCatActionType.LOAD_FAIL
    constructor(public payload: string){}
}



// Add HospitalCategory

export class Create implements Action{
    readonly type = ProductCatActionType.CREATE;
 constructor(public payload: Model){}

}
export class CreateSuccess implements Action{
    readonly type = ProductCatActionType.CREATE_SUCCESS;
    constructor(public payload: Model){}
}
export class CreateFail implements Action{
    readonly type = ProductCatActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory
export class Update implements Action{
    readonly type = ProductCatActionType.UPDATE;
    constructor(public payload: Model){     
       console.log("Action Update",payload);
    }
   }
   
   export class UpdateSuccess implements Action{
    readonly type = ProductCatActionType.UPDATE_SUCCESS;
    constructor(public payload: Model){        
       console.log("Action update success=>",payload);
    }
   }
   
   export class UpdateFail implements Action{
    readonly type = ProductCatActionType.UPDATE_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
   }


// delete HospitalCategory

export class Delete implements Action{
    readonly type = ProductCatActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteSuccess implements Action{
    readonly type = ProductCatActionType.DELETE_SUCCESS;

    constructor(public payload: string){
       console.log("Action delete success",payload);
    }
}

export class DeleteFail implements Action{
    readonly type = ProductCatActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
}

export type ProductCatction=
 Load 
|LoadSuccess 
|LoadFail
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