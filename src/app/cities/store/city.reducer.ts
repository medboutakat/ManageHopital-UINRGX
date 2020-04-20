
import { City } from '../city'
import * as fromRoot from "./store"
import * as oppActions from "./city.actions"
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CityState {
    Cities: City[],
    selectedUserId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}
export interface store extends fromRoot.StoreInterface {
    cities: CityState
}
export const appsAdapter: EntityAdapter<City> = createEntityAdapter<
    City
>();
const initialStates: CityState = {
    Cities: [],
    selectedUserId: null,
    loaded: false,
    loading: false,
    error: ""
}
export const initialState = appsAdapter.getInitialState(initialStates);
export function CityReducer(state = initialState, action: oppActions.Action): CityState {
    switch (action.type) {
        case oppActions.CitiesActionTypes.LOAD_CITIES:
            {
                return {
                    ...state,
                    loaded: false,
                    loading: true
                }
            }
        case oppActions.CitiesActionTypes.LOAD_CITIES_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                Cities: action.playload
            }
        }
        case oppActions.CitiesActionTypes.LOAD_CITIES_FAILED: {
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