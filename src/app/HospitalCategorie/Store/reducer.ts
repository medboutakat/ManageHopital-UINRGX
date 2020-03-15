import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import * as fromRoot from 'src/app/HospitalCategorie/State/app-state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HospitalCat } from '../hospitalCat.model';

export interface HospitalCatState{
    HospitalCats : HospitalCat[],
    loading: boolean,
    loaded : boolean,
    error : string
}

export interface AppState extends fromRoot.AppState{
 Reponses : HospitalCatState
}

export const initialState : HospitalCatState ={
    HospitalCats :[],
    loading: false,
    loaded : false,
    error : ' ',
}
  
export function HospitalCatReducer(state = initialState, action : ActionsFile.HospitalCatAction) : HospitalCatState{
     switch(action.type){
         case ActionsFile.HospitalCatActionType.LOAD_HospitalCat_SUCCESS :{
             return {
                ... state,
                 loading: false,
                 loaded : true,
                 HospitalCats : action.payload
             }
         }
         case ActionsFile.HospitalCatActionType.LOAD_HospitalCat_FAIL :{
             return {
                 ... state,
                 HospitalCats :[],
                 loading :false,
                 loaded :false,
                 error : action.payload
             }
         } 
         default : {
             return state;
         }
     }
    }
  const getHospitalCatsFeatursState = createFeatureSelector<HospitalCatState>(
      "HospitalCats"
  )
   export const getHospitalCats = createSelector(
       getHospitalCatsFeatursState,
       (state : HospitalCatState)=>state.HospitalCats
   )
   export const getHospitalCatsLoading = createSelector(
    getHospitalCatsFeatursState,
    (state : HospitalCatState)=>state.loading
)
export const getHospitalCatsLoaded = createSelector(
    getHospitalCatsFeatursState,
    (state : HospitalCatState)=>state.loaded
)
export const getHospitalCatsError = createSelector(
    getHospitalCatsFeatursState,
    (state : HospitalCatState)=>state.error
)
