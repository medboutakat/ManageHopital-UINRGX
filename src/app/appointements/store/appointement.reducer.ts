
import { Appointement } from '../appointement.model'
import * as fromRoot from "./store"
import * as AppsActions from "./appointement.actions"
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface AppointementState {
    appointements: Appointement[],
    selectedUserId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}
export interface store extends fromRoot.StoreInterface {
    appointements: AppointementState
}
export const appsAdapter: EntityAdapter<Appointement> = createEntityAdapter<
    Appointement
>();
const initialStates: AppointementState = {
    appointements: [],
    selectedUserId: null,
    loaded: false,
    loading: false,
    error: ""
}
export const initialState = appsAdapter.getInitialState(initialStates);
export function AppointementReducer(state = initialState, action: AppsActions.Action): AppointementState {
    switch (action.type) {
        case AppsActions.AppointementActionTypes.LOAD_APPOINTEMENTS:
            {
                return {
                    ...state,
                    loaded: false,
                    loading: true
                }
            }
        case AppsActions.AppointementActionTypes.LOAD_APPOINTEMENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                appointements: action.playload
            }
        }
        case AppsActions.AppointementActionTypes.LOAD_APPOINTEMENTS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.playload
            }
        }
        /*******************************delete Appointement***************************************************** */
        case AppsActions.AppointementActionTypes.DELETE_APPOINTEMENT_SUCCESS: {
            return appsAdapter.removeOne(action.payload, state);
        }
        case AppsActions.AppointementActionTypes.DELETE_APPOINTEMENT_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        /**********************************create appointement********************************************************************* */
        case AppsActions.AppointementActionTypes.CREATE_APPOINTEMENT_SUCCESS: {
            return appsAdapter.addOne(action.payload, state);
        }
        case AppsActions.AppointementActionTypes.CREATE_APPOINTEMENT_FAIL: {
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