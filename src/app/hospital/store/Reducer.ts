import * as ActionsFile from 'src/app/hospital/store/Action'
import * as fromRoot from 'src/app/hospital/state/app-state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityAdapter ,createEntityAdapter ,EntityState} from '@ngrx/entity';
import { Hospital } from '../hospital.model';


export interface HospitalState extends EntityState<Hospital>{
    selectedHospitalbyId : string | null,
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
    selectedHospitalbyId : null,
    loading: false,
    loaded : false,
    error : ' ',
}
// export const initialState : HospitalCatState ={
//     HospitalCats :[],
//     loading: false,
//     loaded : false,
//     error : ' ',
// }
export const initialState = HospitalAdapter.getInitialState(DefaulttHospital)

export function HospitalReducer(state = initialState, action : ActionsFile.HospitalAction) : HospitalState{
      switch(action.type){
   
   case ActionsFile.HospitalActionType.LOAD_Hospital_SUCCESS :{
      return HospitalAdapter.addAll(action.payload,{
        ...state,
        loading : false,
        loaded : true,

      }); 
      }
      
    case ActionsFile.HospitalActionType.LOAD_Hospital_FAIL :{
             return {
                 ... state,
                 loading :false,
                 entities :{},
                 loaded :false,
                 error : action.payload
             }
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
    //    (state : HospitalCatState)=>state.HospitalCats
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
