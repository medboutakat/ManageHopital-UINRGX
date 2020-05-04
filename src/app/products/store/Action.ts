
import { Store, Action } from '@ngrx/store' 
import { Update as EntityUpdate  } from '@ngrx/entity';
import { Product as Model } from '../product.Module';
 
export enum ProductActionType {
    LOAD = "[Model] load Product",
    LOAD_SUCCESS = "[Model] LOAD Product Success",
    LOAD_FAIL = "[Model] Load Product Fail ",
    AddAll = "AddAll", 

    LOAD_ONE = "[Model] Load One Product",
    LOAD_ONE_SUCCESS = "[Model] Load One Product Success",
    LOAD_ONE_FAIL = "[Model] Load One Product Fail",

    CREATE = "[Model] Create Product",
    CREATE_SUCCESS = "[Model] Create Product Success",
    CREATE_FAIL = "[Model] Create Product Fail ",

    UPDATE = "[Model] Update Product",
    UPDATE_SUCCESS = "[Model] Update Product Success",
    UPDATE_FAIL = "[Model] Update Product Fail ",

    DELETE = "[Model] Delete Product",
    DELETE_SUCCESS = "[Model] Delete Product Success",
    DELETE_FAIL = "[Model] Delete Product Fail ",
}

export class Load implements Action{
    readonly type = ProductActionType.LOAD
}
export class LoadSuccess implements Action{
    readonly type = ProductActionType.LOAD_SUCCESS;

 constructor(public payload: Model[]){ }

}
export class LoadFail implements Action{
    readonly type = ProductActionType.LOAD_FAIL
    constructor(public payload: string){}
}

export class LoadOne implements Action {
    readonly type = ProductActionType.LOAD_ONE;
    constructor(public payload: string) {}
}
  
export class LoadOneSuccess implements Action {
    readonly type = ProductActionType.LOAD_ONE_SUCCESS;
    constructor(public payload: Model) {}
}

export class LoadOneFail implements Action {
    readonly type = ProductActionType.LOAD_ONE_FAIL;
    constructor(public payload: string) {}
}

// Add Productegory
export class Create implements Action{
    readonly type = ProductActionType.CREATE;
    constructor(public payload: Model){}
}
export class CreateSuccess implements Action{
    readonly type = ProductActionType.CREATE_SUCCESS;
    constructor(public payload: Model){}
}
export class CreateFail implements Action{
    readonly type = ProductActionType.CREATE_FAIL
    constructor(public payload: string){}
}
 
//Update
export class Update implements Action {
    readonly type = ProductActionType.UPDATE;
    constructor(public payload: Model) {
      console.log("Action Update", payload);
    }
}

export class UpdateSuccess implements Action{
    readonly type = ProductActionType.UPDATE_SUCCESS;
    constructor(public payload: EntityUpdate<Model>){}
}

export class UpdateFail implements Action{
    readonly type = ProductActionType.UPDATE_FAIL
    constructor(public payload: string){}
}

// delete Productegory

export class Delete implements Action{
    readonly type = ProductActionType.DELETE;
 constructor(public payload: string){}

}
export class DeleteSuccess implements Action{
    readonly type = ProductActionType.DELETE_SUCCESS;
    constructor(public payload: string) {}
}

export class DeleteFail implements Action{
    readonly type = ProductActionType.DELETE_FAIL
    constructor(public payload: string){}
}

export type ProductAction=
// LoadProduct
Load
|LoadSuccess  
|LoadFail
// LoadProduct
|LoadOne 
|LoadOneSuccess  
|LoadOneFail
// CreateProduct
 |Create
 |CreateSuccess
 |CreateFail
//  UpdateProduct
 |Update
 |UpdateSuccess
 |UpdateFail
 // DeleteProduct
 |Delete
 |DeleteSuccess
 |DeleteFail;