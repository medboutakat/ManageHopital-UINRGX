
import { Hospital } from '../hospital'
import * as fromRoot from "./stores"
import * as AppsActions from "./hospital.actions"
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface HospitalState {
    hospitals: Hospital[],
    selectedUserId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}
export interface store extends fromRoot.StoreInterface {
    hospitals: HospitalState
}
export const appsAdapter: EntityAdapter<Hospital> = createEntityAdapter<
    Hospital
>();
const initialStates: HospitalState = {
    hospitals: [],
    selectedUserId: null,
    loaded: false,
    loading: false,
    error: ""
}
export const initialState = appsAdapter.getInitialState(initialStates);
export function HospitalReducer(state = initialState, action: AppsActions.Action): HospitalState {
    switch (action.type) {
        case AppsActions.HospitalActionTypes.LOAD_HOSPITALS:
            {
                return {
                    ...state,
                    loaded: false,
                    loading: true
                }
            }
        case AppsActions.HospitalActionTypes.LOAD_HOSPITALS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                hospitals: action.playload
            }
        }
        case AppsActions.HospitalActionTypes.LOAD_HOSPITALS_FAILED: {
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