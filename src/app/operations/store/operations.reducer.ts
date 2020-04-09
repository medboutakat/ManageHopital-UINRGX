
import { Operation } from '../operation'
import * as fromRoot from "./store"
import * as oppActions from "./operation.actions"
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface OperationState {
    operations: Operation[],
    selectedUserId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}
export interface store extends fromRoot.StoreInterface {
    operations: OperationState
}
export const appsAdapter: EntityAdapter<Operation> = createEntityAdapter<
    Operation
>();
const initialStates: OperationState = {
    operations: [],
    selectedUserId: null,
    loaded: false,
    loading: false,
    error: ""
}
export const initialState = appsAdapter.getInitialState(initialStates);
export function OperationReducer(state = initialState, action: oppActions.Action): OperationState {
    switch (action.type) {
        case oppActions.OperationActionTypes.LOAD_OPERATIONS:
            {
                return {
                    ...state,
                    loaded: false,
                    loading: true
                }
            }
        case oppActions.OperationActionTypes.LOAD_OPERATIONS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                operations: action.playload
            }
        }
        case oppActions.OperationActionTypes.LOAD_OPERATIONS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.playload
            }
        }
        /*******************************delete Operation***************************************************** */
        case oppActions.OperationActionTypes.DELETE_OPERATIONS_SUCCESS: {
            return appsAdapter.removeOne(action.payload, state);
        }
        case oppActions.OperationActionTypes.DELETE_OPERATIONS_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        /**********************************create appointement********************************************************************* */
        case oppActions.OperationActionTypes.CREATE_OPERATIONS_SUCCESS: {
            return appsAdapter.addOne(action.payload, state);
        }
        case oppActions.OperationActionTypes.CREATE_OPERATIONS_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        default: {
            return state
        }
    }
}