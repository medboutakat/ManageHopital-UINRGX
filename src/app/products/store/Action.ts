
import { Store, Action } from '@ngrx/store' 
import { Update } from '@ngrx/entity';
import { Product } from '../product.Module';
 
export enum ProductActionType {
    LOAD = "[Product] load Product",
    LOAD_SUCCESS = "[Product] LOAD Product Success",
    LOAD_FAIL = "[Product] Load Product Fail ",
    AddAll = "AddAll", 

    LOAD_ONE = "[Product] Load One Product",
    LOAD_ONE_SUCCESS = "[Product] Load One Product Success",
    LOAD_ONE_FAIL = "[Product] Load One Product Fail",

    CREATE = "[Product] Create Product",
    CREATE_SUCCESS = "[Product] Create Product Success",
    CREATE_FAIL = "[Product] Create Product Fail ",

    UPDATE = "[Product] Update Product",
    UPDATE_SUCCESS = "[Product] Update Product Success",
    UPDATE_FAIL = "[Product] Update Product Fail ",

    DELETE = "[Product] Delete Product",
    DELETE_SUCCESS = "[Product] Delete Product Success",
    DELETE_FAIL = "[Product] Delete Product Fail ",
}

export class LoadProduct implements Action{
    readonly type = ProductActionType.LOAD
}
export class LoadProductSuccess implements Action{
    readonly type = ProductActionType.LOAD_SUCCESS;

 constructor(public payload: Product[]){ }

}
export class LoadProductFail implements Action{
    readonly type = ProductActionType.LOAD_FAIL
    constructor(public payload: string){}
}

export class LoadOneProduct implements Action {
    readonly type = ProductActionType.LOAD_ONE;
    constructor(public payload: string) {}
}
  
export class LoadOneProductSuccess implements Action {
    readonly type = ProductActionType.LOAD_ONE_SUCCESS;
    constructor(public payload: Product) {}
}

export class LoadOneProductFail implements Action {
    readonly type = ProductActionType.LOAD_ONE_FAIL;
    constructor(public payload: string) {}
}

// Add Productegory
export class CreateProduct implements Action{
    readonly type = ProductActionType.CREATE;
    constructor(public payload: Product){}
}
export class CreateProductSuccess implements Action{
    readonly type = ProductActionType.CREATE_SUCCESS;
    constructor(public payload: Product){}
}
export class CreateProductFail implements Action{
    readonly type = ProductActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update Productegory
export class UpdateProduct implements Action{
    readonly type = ProductActionType.UPDATE;
    constructor(public payload: Product){}
}

export class UpdateProductSuccess implements Action{
    readonly type = ProductActionType.UPDATE_SUCCESS;
    constructor(public payload: Update<Product>){}
}

export class UpdateProductFail implements Action{
    readonly type = ProductActionType.UPDATE_FAIL
    constructor(public payload: string){}
}

// delete Productegory

export class DeleteProduct implements Action{
    readonly type = ProductActionType.DELETE;
 constructor(public payload: string){}

}
export class DeleteProductSuccess implements Action{
    readonly type = ProductActionType.DELETE_SUCCESS;
    constructor(public payload: string) {}
}

export class DeleteProductFail implements Action{
    readonly type = ProductActionType.DELETE_FAIL
    constructor(public payload: string){}
}

export type ProductAction=
// LoadProduct
LoadProduct 
|LoadProductSuccess  
|LoadProductFail
// LoadProduct
|LoadOneProduct 
|LoadOneProductSuccess  
|LoadOneProductFail
// CreateProduct
 |CreateProduct
 |CreateProductSuccess
 |CreateProductFail
//  UpdateProduct
 |UpdateProduct
 |UpdateProductSuccess
 |UpdateProductFail
 // DeleteProduct
 |DeleteProduct
 |DeleteProductSuccess
 |DeleteProductFail;