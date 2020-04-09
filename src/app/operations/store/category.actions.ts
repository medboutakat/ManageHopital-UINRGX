import { OperationCategory } from '../operation-category'
import { Action } from '@ngrx/store'
export enum OperationCategoyrActionTypes {
    LOAD_OPERATIONSCATEGORY = "[operationcategory] Load OperationsCategoyr",
    LOAD_OPERATIONSCATEGORY_SUCCESS = "[operationcategory] Load  OperationsCategoyr Success",
    LOAD_OPERATIONSCATEGORY_FAILED = "[operationcategory] Load  OperationsCategoyr Failed",

}
export class LoadOperationsCategory implements Action {
    readonly type = OperationCategoyrActionTypes.LOAD_OPERATIONSCATEGORY
    constructor() { }
}
export class LoadOperationsCategorySuccess implements Action {
    readonly type = OperationCategoyrActionTypes.LOAD_OPERATIONSCATEGORY_SUCCESS
    constructor(public playload: OperationCategory[]) {
    }
}
export class LoadOperationsCategoryFailed implements Action {
    readonly type = OperationCategoyrActionTypes.LOAD_OPERATIONSCATEGORY_FAILED
    constructor(public playload: string) { }
}

export type Action =
    LoadOperationsCategory
    | LoadOperationsCategorySuccess
    | LoadOperationsCategoryFailed
