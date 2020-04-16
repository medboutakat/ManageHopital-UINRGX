
import { Appointement } from '../appointement.model'
import * as fromRoot from "./store"
import * as AppsActions from "./appointement.actions"
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppointementState extends EntityState<Appointement>{
    selectedUserId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface store extends fromRoot.StoreInterface {
    appointements: AppointementState
}
export const appsAdapter: EntityAdapter<Appointement> = createEntityAdapter< Appointement>();
const initialStates: AppointementState = {
    ids :[],
    entities :{},
    selectedUserId: null,
    loaded: false,
    loading: false,
    error: ""
}




export const initialState = appsAdapter.getInitialState(initialStates);
export function AppointementReducer(state = initialState, action: AppsActions.Action): AppointementState {
    switch (action.type) {
        case AppsActions.AppointementActionTypes.LOAD_APPOINTEMENTS_SUCCESS: {
            return appsAdapter.addAll(action.playload,{ 
                ...state,
                loading: false,
                loaded: true,
                }) 
        }
        case AppsActions.AppointementActionTypes.LOAD_APPOINTEMENTS_FAILED: {
            return {
                ...state,
                loading: false,
                entities:{},
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

const getAppointementFeatursState = createFeatureSelector<AppointementState>(
    "Appointements"
)

export const getAppointement = createSelector(
    getAppointementFeatursState,
    //    (state : DoctorCatState)=>state.doctorCats
    appsAdapter.getSelectors().selectAll
   )

   export const getAppointementLoading = createSelector(
    getAppointementFeatursState,
    (state : AppointementState)=>state.loading
)
export const getAppointementLoaded = createSelector(
    getAppointementFeatursState,
    (state : AppointementState)=>state.loaded
)
export const getAppointementError = createSelector(
    getAppointementFeatursState,
    (state : AppointementState)=>state.error
)
export const getAppointementbyid = createSelector(
    getAppointementFeatursState,
 (state : AppointementState)=>state.selectedUserId
);
export const getcurrenthospital = createSelector(
    getAppointementFeatursState,
    getAppointementbyid,
    state => state.entities[state.selectedUserId]
);