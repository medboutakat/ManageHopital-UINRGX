import { Store, Action } from "@ngrx/store";
import { Product } from "../product.model"; 

export enum ProductActionType {
  LOAD = "[Product] load Product",
  LOAD_SUCCESS = "[Product] LOAD Product Success",
  LOAD_FAIL = "[Product] Load Product Fail ",
  AddAll = "AddAll",

  CREATE = "[Product] Create Product",
  CREATE_SUCCESS = "[Product] Create Product Success",
  CREATE_FAIL = "[Product] Create Product Fail ",

  UPDATE = "[Product] Update Product",
  UPDATE_SUCCESS = "[Product] Update Product Success",
  UPDATE_FAIL = "[Product] Update Product Fail ",

  UPDATE_IMAGES = "[Product] Update Product",
  UPDATE_IMAGES_SUCCESS = "[Product] Update Product Success",
  UPDATE_IMAGES_FAIL = "[Product] Update Product Fail ",

  DELETE = "[Product] Delete Product",
  DELETE_SUCCESS = "[Product] Delete Product Success",
  DELETE_FAIL = "[Product] Delete Product Fail ",
}

export class Load implements Action {
  readonly type = ProductActionType.LOAD;
}
export class LoadSuccess implements Action {
  readonly type = ProductActionType.LOAD_SUCCESS;

  constructor(public payload: Product[]) {}
}
export class LoadFail implements Action {
  readonly type = ProductActionType.LOAD_FAIL;
  constructor(public payload: string) {}
}

// Create
export class Create implements Action {
  readonly type = ProductActionType.CREATE;
  constructor(public payload: Product) { 
    console.log("Action Create", payload);
  }
}
export class CreateSuccess implements Action {
  readonly type = ProductActionType.CREATE_SUCCESS;

  constructor(public payload: Product) { 
    console.log("Action Create success=>", payload);
  }
}
export class CreateFail implements Action {
  readonly type = ProductActionType.CREATE_FAIL;
  constructor(public payload: string) {
    console.log("Action Create fail=>", payload);
    }
}

//Update
export class Update implements Action {
  readonly type = ProductActionType.UPDATE;
  constructor(public payload: Product) {
    console.log("Action Update", payload);
  }
}
export class UpdateSuccess implements Action {
  readonly type = ProductActionType.UPDATE_SUCCESS;
  constructor(public payload: Product) {
    console.log("Action update success=>", payload);
  }
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionType.UPDATE_FAIL;
  constructor(public payload: string) {
    console.log("Action update fail", payload);
  }
}

// delete
export class Delete implements Action {
  readonly type = ProductActionType.DELETE;
  constructor(public payload: string) {}
}
export class DeleteSuccess implements Action {
  readonly type = ProductActionType.DELETE_SUCCESS;

  constructor(public payload: string) {
    console.log("Action delete success", payload);
  }
}

export class DeleteFail implements Action {
  readonly type = ProductActionType.DELETE_FAIL;
  constructor(public payload: string) {
    console.log("Action delete fail", payload);
  }
}
export type ProductAction =
  // LoadProductCat
  | Load
  | LoadSuccess
  | LoadFail
  // CreateProductCat
  | Create
  | CreateSuccess
  | CreateFail
  //  UpdateProductCat
  | Update
  | UpdateSuccess
  | UpdateProductFail
  // DeleteProductCat
  | Delete
  | DeleteSuccess
  | DeleteFail;
