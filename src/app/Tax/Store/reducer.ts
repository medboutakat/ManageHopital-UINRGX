import * as ActionsFile from 'src/app/Tax/Store/Action'
import * as fromRoot from 'src/app/Tax/Store/app-state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Tax } from '../tax.Module';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity'; 

export interface TaxState extends EntityState<Tax> {
  selectedDoctorbyId: string | null,
  loading: boolean,
  loaded: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  Taxs: TaxState
}
export const TaxAdapter: EntityAdapter<Tax> = createEntityAdapter<Tax>();

export const DefaultTax: TaxState = {
  ids: [],
  entities: {},
  selectedDoctorbyId: null,
  loading: false,
  loaded: false,
  error: ' ',
}
 
export const initialState = TaxAdapter.getInitialState(DefaultTax)

export function TaxReducer(state = initialState, action: ActionsFile.TaxAction): TaxState {
  switch (action.type) {
    case ActionsFile.TaxActionType.LOAD_SUCCESS: {
      return TaxAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,

      });
    }
    case ActionsFile.TaxActionType.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        entities: {},
        loaded: false,
        error: action.payload
      }
    }
    case ActionsFile.TaxActionType.CREATE_SUCCESS: {
      return TaxAdapter.addOne(action.payload, state);
    }
    case ActionsFile.TaxActionType.CREATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionsFile.TaxActionType.UPDATE_SUCCESS: {
      const changes = action.payload;
      const id = changes.id;
      console.log("updateOne:hello: ", changes)
      return TaxAdapter.updateOne({ id, changes }, state);
    }
    case ActionsFile.TaxActionType.UPDATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionsFile.TaxActionType.DELETE_SUCCESS: {
      return TaxAdapter.removeOne(action.payload, state);
    }
    case ActionsFile.TaxActionType.DELETE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
const getDoctorlCatsFeatursState = createFeatureSelector<TaxState>(
  "Taxs"
)
export const getHospitalCats = createSelector(
  getDoctorlCatsFeatursState,
  //    (state : TaxState)=>state.Taxs
  TaxAdapter.getSelectors().selectAll

)
export const getHospitalCatsLoading = createSelector(
  getDoctorlCatsFeatursState,
  (state: TaxState) => state.loading
)
export const getHospitalCatsLoaded = createSelector(
  getDoctorlCatsFeatursState,
  (state: TaxState) => state.loaded
)
export const getHospitalCatsError = createSelector(
  getDoctorlCatsFeatursState,
  (state: TaxState) => state.error
)
export const getTaxsbyid = createSelector(
  getDoctorlCatsFeatursState,
  (state: TaxState) => state.selectedDoctorbyId
);
export const getcurrenthospital = createSelector(
  getDoctorlCatsFeatursState,
  getTaxsbyid,
  state => state.entities[state.selectedDoctorbyId]
);