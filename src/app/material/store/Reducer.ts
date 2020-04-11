import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityAdapter ,createEntityAdapter ,EntityState} from '@ngrx/entity';
import { Material } from '../material-model';
import * as fromRoot from 'src/app/Material/store/app-state'
import * as ActionsFile from 'src/app/Material/store/Action'
 
export interface MaterialState extends EntityState<Material>{
    selectedById : string | null,
    loading: boolean,
    loaded : boolean,
    error : string
}

export interface AppState extends fromRoot.AppState{
    Materials : MaterialState
}

export const MaterialAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();
export const DefaultState : MaterialState={
    ids :[],
    entities :{},
    selectedById : null,
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
export const initialState = MaterialAdapter.getInitialState(DefaultState)

export function MaterialReducer(state = initialState, action : ActionsFile.MaterialAction) : MaterialState{
      switch(action.type){
   
   case ActionsFile.MaterialActionType.LOAD_SUCCESS :{
      return MaterialAdapter.addAll(action.payload,{
        ...state,
        loading : false,
        loaded : true,

      }); 
      }
      
    case ActionsFile.MaterialActionType.LOAD_FAIL :{
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
  

  const getHospitalsFeatursState = createFeatureSelector<MaterialState>(
      "Material"
  )
   export const getHospitalCats = createSelector(
       getHospitalsFeatursState,
    //    (state : HospitalCatState)=>state.HospitalCats
      MaterialAdapter.getSelectors().selectAll
   )
   export const getHospitalCatsLoading = createSelector(
    getHospitalsFeatursState,
    (state : MaterialState)=>state.loading
)
export const getHospitalCatsLoaded = createSelector(
    getHospitalsFeatursState,
    (state : MaterialState)=>state.loaded
)
export const getHospitalCatsError = createSelector(
    getHospitalsFeatursState,
    (state : MaterialState)=>state.error
)
export const getHospitalCatsbyid = createSelector(
    getHospitalsFeatursState,
    (state :MaterialState)=>state.selectedById
);
export const getcurrenthospital = createSelector(
    getHospitalsFeatursState,
    getHospitalCatsbyid,
    state => state.entities[state.selectedById]
);
