
import { Operation } from '../operation'
import * as fromRoot from "./store"
import * as oppActions from "./operation.actions"
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export interface OperationState extends EntityState<Operation> {
    selectedById: string | null,
    loadSeccess: boolean,
    getting: boolean,
    error: string
}

export interface AppState extends fromRoot.StoreInterface {
    opeartions: OperationState
}
export const OperationAdapter: EntityAdapter<Operation> = createEntityAdapter<Operation>();
export const DefaultState: OperationState = {
    ids: [],
    entities: {},
    selectedById: null,
    loadSeccess: false,
    getting: false,
    error: " "
}


export const initialState = OperationAdapter.getInitialState(DefaultState);
export function OperationReducer(state = initialState, action: oppActions.Action): OperationState {
    switch (action.type) {
        case oppActions.OperationActionTypes.LOAD_OPERATIONS_SUCCESS: {
            return OperationAdapter.addAll(action.playload, {
                ...state,
                loadSeccess: false,
                getting: true,

            });
        }
        case oppActions.OperationActionTypes.LOAD_OPERATIONS_FAILED: {
            return {
                ...state,
                entities: {},
                getting: false,
                loadSeccess: false,
                error: action.playload
            }
        }
        /*******************************delete Operation***************************************************** */
        case oppActions.OperationActionTypes.DELETE_OPERATIONS_SUCCESS: {
            return OperationAdapter.removeOne(action.payload, state);
        }
        case oppActions.OperationActionTypes.DELETE_OPERATIONS_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        /**********************************create Operation********************************************************************* */
        case oppActions.OperationActionTypes.CREATE_OPERATIONS_SUCCESS: {
            return OperationAdapter.addOne(action.payload, state);
        }
        case oppActions.OperationActionTypes.CREATE_OPERATIONS_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        /************************Update Operation********************************* */

        case oppActions.OperationActionTypes.UPDATE_OPERATIONS_SUCCESS: {
            const changes = action.payload;
            const id = changes.id;
            console.log("updateOne:hello: ", changes)
            return OperationAdapter.updateOne({ id, changes }, state);
        }
        case oppActions.OperationActionTypes.UPDATE_OPERATIONS_FAIL: {
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