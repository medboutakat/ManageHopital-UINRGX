import { createFeatureSelector, createSelector, State } from "@ngrx/store"
import { EntityAdapter, createEntityAdapter, EntityState, Update } from "@ngrx/entity"
import * as fromRoot from '../doctor-store/app-state';
import * as doctorActions from '../doctor-store/doctor.action';
import { Doctor } from '../doctor.model';

export interface doctorState extends EntityState<Doctor> {
  selectedById: string | null,
  loadSeccess: boolean,
  getting: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  doctors: doctorState
}
export const DoctorAdapter: EntityAdapter<Doctor> = createEntityAdapter<Doctor>();
export const DefaultState: doctorState = {
  ids: [],
  entities: {},
  selectedById: null,
  loadSeccess: false,
  getting: false,
  error: " "
}

export interface AppSate extends fromRoot.AppState {
  doctors: doctorState
}
export const initialState = DoctorAdapter.getInitialState(DefaultState);
//reducer
export function doctorReducer(state = initialState, action: doctorActions.CustomAction): doctorState {
  switch (action.type) {

    case doctorActions.DoctorActionTypes.GET_DOCTORS_SECCESS: {
      return DoctorAdapter.addAll(action.payload, {
        ...state,
        loadSeccess: false,
        getting: true,

      });
    }
    case doctorActions.DoctorActionTypes.GET_DOCTOR_FAIL: {
      return {
        ...state,
        entities: {},
        getting: false,
        loadSeccess: false,
        error: action.payload
      }
    }
    /*******************************delete Doctor***************************************************** */
    case doctorActions.DoctorActionTypes.DELETE_DOCTOR_SUCCESS: {
      return DoctorAdapter.removeOne(action.payload, state)

    }
    case doctorActions.DoctorActionTypes.DELETE_DOCTOR_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    /**********************************create Doctor********************************************************************* */
    case doctorActions.DoctorActionTypes.ADD_DOCTOR_SUCCESS: {
      return DoctorAdapter.addOne(action.payload, state);
    }
    case doctorActions.DoctorActionTypes.ADD_DOCTOR_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    /************************Update Doctor********************************* */


    case doctorActions.DoctorActionTypes.UPDATE_DOCTOR_SUCCESS: {
      const changes = action.payload;
      const id = changes.id;
      return DoctorAdapter.updateOne({ id, changes }, state);
    }
    case doctorActions.DoctorActionTypes.UPDATE_DOCTOR_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

