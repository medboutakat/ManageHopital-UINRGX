
import { Store, Action } from '@ngrx/store'
import { productCat } from '../productCat.Module';
 
export enum ProductCatActionType {
    LOAD = "[ProductCat] load ProductCat",
    LOAD_SUCCESS = "[ProductCat] LOAD ProductCat Success",
    LOAD_FAIL = "[ProductCat] Load ProductCat Fail ",
    AddAll = "AddAll",
     
    CREATE = "[ProductCat] Create ProductCat",
    CREATE_SUCCESS = "[ProductCat] Create ProductCat Success",
    CREATE_FAIL = "[ProductCat] Create ProductCat Fail ",

    UPDATE = "[ProductCat] Update ProductCat",
    UPDATE_SUCCESS = "[ProductCat] Update ProductCat Success",
    UPDATE_FAIL = "[ProductCat] Update ProductCat Fail ",

    DELETE= "[ProductCat] Delete ProductCat",
    DELETE_SUCCESS = "[ProductCat] Delete ProductCat Success",
    DELETE_FAIL = "[ProductCat] Delete ProductCat Fail ",
}

export class LoadProductCat implements Action{
    readonly type = ProductCatActionType.LOAD
}
export class LoadProductCatSuccess implements Action{
    readonly type = ProductCatActionType.LOAD_SUCCESS;

 constructor(public payload: productCat[]){ }

}
export class LoadProductCatFail implements Action{
    readonly type = ProductCatActionType.LOAD_FAIL
    constructor(public payload: string){}
}



// Add HospitalCategory

export class CreateProductCat implements Action{
    readonly type = ProductCatActionType.CREATE;
 constructor(public payload: productCat){}

}
export class CreateProductCatSuccess implements Action{
    readonly type = ProductCatActionType.CREATE_SUCCESS;
    constructor(public payload: productCat){}
}
export class CreateProductCatFail implements Action{
    readonly type = ProductCatActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory
export class UpdateProductCat implements Action{
    readonly type = ProductCatActionType.UPDATE;
    constructor(public payload: productCat){     
       console.log("Action Update",payload);
    }
   }
   
   export class UpdateProductCatSuccess implements Action{
    readonly type = ProductCatActionType.UPDATE_SUCCESS;
    constructor(public payload: productCat){        
       console.log("Action update success=>",payload);
    }
   }
   
   export class UpdateProductCatFail implements Action{
    readonly type = ProductCatActionType.UPDATE_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
   }


// delete HospitalCategory

export class DeleteProductCat implements Action{
    readonly type = ProductCatActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteProductCatSuccess implements Action{
    readonly type = ProductCatActionType.DELETE_SUCCESS;

    constructor(public payload: string){
       console.log("Action delete success",payload);
    }
}

export class DeleteProductCatFail implements Action{
    readonly type = ProductCatActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
}

export type ProductCatction=
 LoadProductCat 
|LoadProductCatSuccess 
|LoadProductCatFail
// CreateHospitalCat
|CreateProductCat
| CreateProductCatSuccess
|CreateProductCatFail
 // DeleteHospitalCat
|DeleteProductCat
|DeleteProductCatSuccess
|DeleteProductCatFail
//  UpdateHospitalCat
|UpdateProductCat
|UpdateProductCatSuccess
|UpdateProductCatFail