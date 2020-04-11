
import { Store, Action } from '@ngrx/store' 
import { Update } from '@ngrx/entity';
import { Material } from '../material-model';
 
export enum MaterialActionType {
    LOAD = "[Material] load Material",
    LOAD_SUCCESS = "[Material] LOAD Material Success",
    LOAD_FAIL = "[Material] Load Material Fail ",
    AddAll = "AddAll", 

    CREATE = "[Material] Create Material",
    CREATE_SUCCESS = "[Material] Create Material Success",
    CREATE_FAIL = "[Material] Create Material Fail ",

    UPDATE = "[Material] Update Material",
    UPDATE_SUCCESS = "[Material] Update Material Success",
    UPDATE_FAIL = "[Material] Update Material Fail ",

    DELETE = "[Material] Delete Material",
    DELETE_SUCCESS = "[Material] Delete Material Success",
    DELETE_FAIL = "[Material] Delete Material Fail ",
}

export class LoadMaterial implements Action{
    readonly type = MaterialActionType.LOAD
}
export class LoadMaterialSuccess implements Action{
    readonly type = MaterialActionType.LOAD_SUCCESS;
    constructor(public payload: Material[]){ }
}
export class LoadMaterialFail implements Action{
    readonly type = MaterialActionType.LOAD_FAIL
    constructor(public payload: string){}
}

 

export class CreateMaterial implements Action{
    readonly type = MaterialActionType.CREATE;
    constructor(public payload: Material){}
}
export class CreateMaterialSuccess implements Action{
    readonly type = MaterialActionType.CREATE_SUCCESS;

 constructor(public payload: Material){}

}
export class CreateMaterialFail implements Action{
    readonly type = MaterialActionType.CREATE_FAIL
    constructor(public payload: string){}
}
 
export class UpdateMaterial implements Action{
    readonly type = MaterialActionType.UPDATE;
 constructor(public payload: Material){}

}
export class UpdateMaterialSuccess implements Action{
    readonly type = MaterialActionType.UPDATE_SUCCESS;

 constructor(public payload: Update<Material>){}

}
export class UpdateMaterialFail implements Action{
    readonly type = MaterialActionType.UPDATE_FAIL
    constructor(public payload: string){}
}

// delete MaterialCategory

export class DeleteMaterial implements Action{
    readonly type = MaterialActionType.DELETE;
 constructor(public payload: string){}

}
export class DeleteMaterialSuccess implements Action{
    readonly type = MaterialActionType.DELETE_SUCCESS;
}

export class DeleteMaterialFail implements Action{
    readonly type = MaterialActionType.DELETE_FAIL
    constructor(public payload: string){}
}

export type MaterialAction=
// Load
 LoadMaterial |
 LoadMaterialSuccess | 
 LoadMaterialFail
// Create
 |CreateMaterial
 |CreateMaterialSuccess
 |CreateMaterialFail
//  Update
 |UpdateMaterial
 |UpdateMaterialSuccess
 |UpdateMaterialFail
 // Delete
 |DeleteMaterial
 |DeleteMaterialSuccess
 |DeleteMaterialFail;