import * as ActionsFile from 'src/app/hospitals/store/Action'  
import * as fromRoot from "src/app/hospitals/Store/app-state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityAdapter ,createEntityAdapter ,EntityState} from '@ngrx/entity';
import { Hospital } from '../hospital.model';


export interface HospitalState extends EntityState<Hospital>{
    selectedHospitalbyId : string | null,
    hospitals:Hospital[],
    loading: boolean,
    loaded : boolean,
    error : string
}

export interface AppState extends fromRoot.AppState{
    HospitalCats : HospitalState
}

export const HospitalAdapter: EntityAdapter<Hospital> = createEntityAdapter<Hospital>();
export const DefaulttHospital : HospitalState={
    ids :[],
    entities :{},
    hospitals:[],
    selectedHospitalbyId : null,
    loading: false,
    loaded : false,
    error : ' ',
} 

export const initialState = HospitalAdapter.getInitialState(DefaulttHospital)

export function HospitalReducer(state = initialState, action : ActionsFile.HospitalAction) : HospitalState{
      switch(action.type){
   
        case ActionsFile.HospitalActionType.LOAD_SUCCESS: {
            return HospitalAdapter.addAll(action.payload, {
              ...state,
              loading: false,
              loaded: true,
              hospitals:action.payload
            });
          }
      
          case ActionsFile.HospitalActionType.LOAD_FAIL: {
            return {
              ...state,
              loading: false,
              entities: {},
              loaded: false,
              error: action.payload,
            };
          }

          case ActionsFile.HospitalActionType.CREATE_SUCCESS: {
            return HospitalAdapter.addOne(action.payload, state);
          }
          case ActionsFile.HospitalActionType.CREATE_FAIL: {
            return {
              ...state,
              error: action.payload,
            };
          }

          case ActionsFile.HospitalActionType.UPDATE_SUCCESS: { 
            const changes = action.payload;
            const id = changes.id;
            console.log("updateOne:hello: ", changes)
            return HospitalAdapter.updateOne({ id,changes } , state);
          }
          case ActionsFile.HospitalActionType.UPDATE_FAIL: {
            return {
              ...state,
              error: action.payload,
            };
          }

          case ActionsFile.HospitalActionType.DELETE_SUCCESS: {
            return HospitalAdapter.removeOne(action.payload, state);
          }
          case ActionsFile.HospitalActionType.DELETE_FAIL: {
            return {
              ...state,
              error: action.payload,
            };
          }
         default : {
            return state;
        } 
   }

}    
  

  const getHospitalsFeatursState = createFeatureSelector<HospitalState>(
      "Hospitals"
  )
export const getHospitals = createSelector(
       getHospitalsFeatursState,
      HospitalAdapter.getSelectors().selectAll
)
export const getHospitalsLoading = createSelector(
    getHospitalsFeatursState,
    (state : HospitalState)=>state.loading
)
export const getHospitalsLoaded = createSelector(
    getHospitalsFeatursState,
    (state : HospitalState)=>state.loaded
)
export const getHospitalsError = createSelector(
    getHospitalsFeatursState,
    (state : HospitalState)=>state.error
)
export const getHospitalsbyid = createSelector(
    getHospitalsFeatursState,
    (state :HospitalState)=>state.selectedHospitalbyId
);
export const getcurrenthospital = createSelector(
    getHospitalsFeatursState,
    getHospitalsbyid,
    state => state.entities[state.selectedHospitalbyId]
);
