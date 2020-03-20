
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
        default: {
            return state
        }
    }
}