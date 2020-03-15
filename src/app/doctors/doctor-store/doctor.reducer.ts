import {createFeatureSelector, createSelector} from "@ngrx/store"
import { EntityAdapter, createEntityAdapter, EntityState, Update } from "@ngrx/entity"
import * as fromRoot from '../doctor-store/app-state';
import * as doctorActions from '../doctor-store/doctor.action';
import { Doctor } from '../doctor.model';

export interface doctorState {
  doctors:Doctor[],
  loadSeccess:boolean,
  getting:boolean,
  error:string
}

export interface AppState extends fromRoot.AppState{
  doctors : doctorState
 }

export const initialState: doctorState ={
    doctors:[],
    loadSeccess:false,
    getting:false,
    error:" "
}

export interface AppSate extends fromRoot.AppState{
    doctors : doctorState
}

//reducer
export function doctorReducer(state = initialState,action: doctorActions.CustomAction):doctorState{
  switch(action.type){
     
    case doctorActions.DoctorActionTypes.GET_DOCTORS_SECCESS :{
      return {
         ... state,
          getting: false,
          loadSeccess : true,
          doctors : action.payload
      }
  }
  case doctorActions.DoctorActionTypes.GET_DOCTORS_FAIL :{
      return {
          ... state,
          doctors :[],
          getting: false,
          loadSeccess : true,
          error : action.payload
      }
  } 
  default : {
      return state;
  }
  }
}

const getDoctorFeautursState = createFeatureSelector<doctorState>(
  "doctors"
)

export const getDoctors = createSelector(
  getDoctorFeautursState,
  (state : doctorState)=>state.doctors
)

export const getdoctorsGetting = createSelector(
  getDoctorFeautursState,
  (state:doctorState)=> state.getting
)

export const getDoctorLoadSuccess = createSelector(
  getDoctorFeautursState,
  (state:doctorState)=> state.loadSeccess
)

export const getCurrentDoctorError = createSelector(
  getDoctorFeautursState,
  (state:doctorState)=> state.error
);