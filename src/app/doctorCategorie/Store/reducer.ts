import * as ActionsFile from 'src/app/doctorCategorie/Store/Action'
import * as fromRoot from 'src/app/doctorCategorie/State/app-state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { doctorCat } from '../doctorCat.module';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity'; 

export interface DoctorCatState extends EntityState<doctorCat> {
  selectedDoctorbyId: string | null,
  loading: boolean,
  loaded: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  doctorCats: DoctorCatState
}
export const doctorCatAdapter: EntityAdapter<doctorCat> = createEntityAdapter<doctorCat>();

export const DefaultDoctorCat: DoctorCatState = {
  ids: [],
  entities: {},
  selectedDoctorbyId: null,
  loading: false,
  loaded: false,
  error: ' ',
}
// export const initialState : DoctorCatState ={
//     doctorCats :[],
//     loading: false,
//     loaded : false,
//     error : ' ',
// }
export const initialState = doctorCatAdapter.getInitialState(DefaultDoctorCat)

export function DoctorCatReducer(state = initialState, action: ActionsFile.DoctorCatction): DoctorCatState {
  switch (action.type) {
    case ActionsFile.DoctorCatActionType.LOAD_SUCCESS: {
      return doctorCatAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,

      });
    }
    case ActionsFile.DoctorCatActionType.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        entities: {},
        loaded: false,
        error: action.payload
      }
    }
    case ActionsFile.DoctorCatActionType.CREATE_SUCCESS: {
      return doctorCatAdapter.addOne(action.payload, state);
    }
    case ActionsFile.DoctorCatActionType.CREATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionsFile.DoctorCatActionType.UPDATE_SUCCESS: {
      const changes = action.payload;
      const id = changes.id;
      console.log("updateOne:hello: ", changes)
      return doctorCatAdapter.updateOne({ id, changes }, state);
    }
    case ActionsFile.DoctorCatActionType.UPDATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionsFile.DoctorCatActionType.DELETE_SUCCESS: {
      return doctorCatAdapter.removeOne(action.payload, state);
    }
    case ActionsFile.DoctorCatActionType.DELETE_FAIL: {
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
const getDoctorlCatsFeatursState = createFeatureSelector<DoctorCatState>(
  "DoctorCats"
)
export const getHospitalCats = createSelector(
  getDoctorlCatsFeatursState,
  //    (state : DoctorCatState)=>state.doctorCats
  doctorCatAdapter.getSelectors().selectAll

)
export const getHospitalCatsLoading = createSelector(
  getDoctorlCatsFeatursState,
  (state: DoctorCatState) => state.loading
)
export const getHospitalCatsLoaded = createSelector(
  getDoctorlCatsFeatursState,
  (state: DoctorCatState) => state.loaded
)
export const getHospitalCatsError = createSelector(
  getDoctorlCatsFeatursState,
  (state: DoctorCatState) => state.error
)
export const getDoctorCatsbyid = createSelector(
  getDoctorlCatsFeatursState,
  (state: DoctorCatState) => state.selectedDoctorbyId
);
export const getcurrenthospital = createSelector(
  getDoctorlCatsFeatursState,
  getDoctorCatsbyid,
  state => state.entities[state.selectedDoctorbyId]
);