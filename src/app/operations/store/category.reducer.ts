
import { OperationCategory } from '../operation-category'
import * as fromRoot from "./stores"
import * as oppActions from "./category.actions"
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface OperationCategoryState {
    operationsCategory: OperationCategory[],
    selectedUserId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}
export interface store extends fromRoot.StoreInterface {
    operationsCategory: OperationCategoryState
}
export const appsAdapter: EntityAdapter<OperationCategory> = createEntityAdapter<
    OperationCategory
>();
const initialStates: OperationCategoryState = {
    operationsCategory: [],
    selectedUserId: null,
    loaded: false,
    loading: false,
    error: ""
}
export const initialState = appsAdapter.getInitialState(initialStates);
export function OperationCategoryReducer(state = initialState, action: oppActions.Action): OperationCategoryState {
    switch (action.type) {
        case oppActions.OperationCategoyrActionTypes.LOAD_OPERATIONSCATEGORY:
            {
                return {
                    ...state,
                    loaded: false,
                    loading: true
                }
            }
        case oppActions.OperationCategoyrActionTypes.LOAD_OPERATIONSCATEGORY_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                operationsCategory: action.playload
            }
        }
        case oppActions.OperationCategoyrActionTypes.LOAD_OPERATIONSCATEGORY_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.playload
            }
        }

        default: {
            return state
        }
    }
}