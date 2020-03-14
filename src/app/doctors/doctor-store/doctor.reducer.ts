import {createFeatureSelector, createSelector} from "@ngrx/store"
import { EntityAdapter, createEntityAdapter, EntityState, Update } from "@ngrx/entity"
import * as fromRoot from '../doctor-store/app-state';
import * as doctorActions from '../doctor-store/doctor.action';
import { Doctor } from '../doctor.model';

export interface doctorState extends EntityState<Doctor> {
    selectdoctorId:number | null,
    loadSeccess:boolean,
    getting:boolean,
    error:string
}

export const doctorAdapter:EntityAdapter<Doctor> = createEntityAdapter<Doctor>();

export const defaultDoctor: doctorState ={
    ids:[],
    entities:{},
    selectdoctorId:null,
    loadSeccess:false,
    getting:false,
    error:""
}

export const initialState:doctorState = doctorAdapter.getInitialState(defaultDoctor);

export interface AppSate extends fromRoot.AppState{
    doctors : doctorState
}

 export function doctorReducer(state = initialState,action: doctorActions.CustomAction):doctorState{
    switch(action.type){
        case doctorActions.DoctorActionTypes.GET_DOCTORS_SECCESS:{
            return doctorAdapter.addAll(action.payload, {
                ...state,
                getting: true,
                loadSeccess:true,
                customers:action.payload
            })
        }
        case doctorActions.DoctorActionTypes.GET_DOCTORS_FAIL:{
            return {
                ...state,
                entities:{},
                getting: true,
                error:action.payload
            }
        }
//get one actions
        case doctorActions.DoctorActionTypes.GET_DOCTOR_SECCESS: {
            return doctorAdapter.addOne(action.payload, {
            ...state,
            selectedDoctorId: action.payload.id
            });
        }
        case doctorActions.DoctorActionTypes.GET_DOCTOR_FAIL: {
            return {
            ...state,
            error: action.payload
            };
        }
    }
}