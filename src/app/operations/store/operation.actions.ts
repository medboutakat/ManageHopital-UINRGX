import { Operation } from '../operation'
import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
export enum OperationActionTypes {
    LOAD_OPERATIONS = "[operation] Load Operations",
    LOAD_OPERATIONS_SUCCESS = "[operation] Load  Operations Success",
    LOAD_OPERATIONS_FAILED = "[operation] Load  Operations Failed",
    DELETE_OPERATIONS = "[operation] Delete Operations",
    DELETE_OPERATIONS_SUCCESS = "[operation] Delete Operations Success",
    DELETE_OPERATIONS_FAIL = "[operation] Delete Operations Fail",
    CREATE_OPERATIONS = "[operation] Create Operations",
    CREATE_OPERATIONS_SUCCESS = "[operation] Create Operations Success",
    CREATE_OPERATIONS_FAIL = "[operation] Create Operations Fail",
    UPDATE_OPERATIONS = "[operation] Update Operations",
    UPDATE_OPERATIONS_SUCCESS = "[operation] Update Operations Success",
    UPDATE_OPERATIONS_FAIL = "[operation] Update Operations Fail ",
}
export class LoadOperations implements Action {
    readonly type = OperationActionTypes.LOAD_OPERATIONS
    constructor() {        
        console.log("LoadOperations")
     }
}
export class LoadOperationsSuccess implements Action {
    readonly type = OperationActionTypes.LOAD_OPERATIONS_SUCCESS
    constructor(public playload: Operation[]) {         
        console.log("OperationActionTypes")
    }
}
export class LoadOperationsFailed implements Action {
    readonly type = OperationActionTypes.LOAD_OPERATIONS_FAILED
    constructor(public playload: string) { 
        
        console.log("LoadOperationsFailed")
    }
}
export class DeleteOperation implements Action {
    readonly type = OperationActionTypes.DELETE_OPERATIONS;

    constructor(public payload) {        
        console.log("DeleteOperation")
     }
}

export class DeleteOperationSuccess implements Action {
    readonly type = OperationActionTypes.DELETE_OPERATIONS_SUCCESS;

    constructor(public payload) {         
        console.log("DeleteOperationSuccess")
    }
}

export class DeleteOperationFail implements Action {
    readonly type = OperationActionTypes.DELETE_OPERATIONS_FAIL;

    constructor(public payload: string) {  
        console.log("DeleteOperationFail")
    }
}
export class CreateOperation implements Action {
    readonly type = OperationActionTypes.CREATE_OPERATIONS;

    constructor(public payload: Operation) {                    
        console.log("CreateOperation")
     }
}

export class CreateOperationSuccess implements Action {
    readonly type = OperationActionTypes.CREATE_OPERATIONS_SUCCESS;

    constructor(public payload: Operation) {                       
        console.log("CreateOperationSuccess")
    }
}

export class CreateOperationFail implements Action {
    readonly type = OperationActionTypes.CREATE_OPERATIONS_FAIL;
    constructor(public payload: string) {                 
        console.log("CreateOperationFail")
    }
}

export class UpdateOperation implements Action {
    readonly type = OperationActionTypes.UPDATE_OPERATIONS;
    constructor(public payload: Operation) {          
        console.log("UpdateOperation")
    }
}

export class UpdateOperationSuccess implements Action {
    readonly type = OperationActionTypes.UPDATE_OPERATIONS_SUCCESS;
    constructor(public payload: Operation) { 
        console.log("UpdateOperationSuccess")
    }
}

export class UpdateOperationFail implements Action {
    readonly type = OperationActionTypes.UPDATE_OPERATIONS_FAIL
    constructor(public payload: string) { }
}
export type Action =
    LoadOperations
    | LoadOperationsSuccess
    | LoadOperationsFailed
    | DeleteOperation
    | DeleteOperationSuccess
    | DeleteOperationFail
    | CreateOperation
    | CreateOperationSuccess
    | CreateOperationFail
    | UpdateOperation
    | UpdateOperationSuccess
    | UpdateOperationFail