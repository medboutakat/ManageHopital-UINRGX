import * as ActionsFile from 'src/app/customerCategorie/Store/Action'
import * as fromRoot from 'src/app/customerCategorie/Store/app-state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { customerCat } from '../customerCat.Module';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity'; 

export interface CustomerCatState extends EntityState<customerCat> {
  selectedcustomerbyId: string | null,
  loading: boolean,
  loaded: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  customerCats: CustomerCatState
}
export const customerCatAdapter: EntityAdapter<customerCat> = createEntityAdapter<customerCat>();

export const DefaultCustomerCat: CustomerCatState = {
  ids: [],
  entities: {},
  selectedcustomerbyId: null,
  loading: false,
  loaded: false,
  error: ' ',
}
// export const initialState : CustomerCatState ={
//     customerCats :[],
//     loading: false,
//     loaded : false,
//     error : ' ',
// }
export const initialState = customerCatAdapter.getInitialState(DefaultCustomerCat)

export function CustomerCatReducer(state = initialState, action: ActionsFile.CustomerCatction): CustomerCatState {
  switch (action.type) {
    case ActionsFile.CustomerCatActionType.LOAD_SUCCESS: {
      return customerCatAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,

      });
    }
    case ActionsFile.CustomerCatActionType.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        entities: {},
        loaded: false,
        error: action.payload
      }
    }
    case ActionsFile.CustomerCatActionType.CREATE_SUCCESS: {
      return customerCatAdapter.addOne(action.payload, state);
    }
    case ActionsFile.CustomerCatActionType.CREATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionsFile.CustomerCatActionType.UPDATE_SUCCESS: {
      const changes = action.payload;
      const id = changes.id;
      console.log("updateOne:hello: ", changes)
      return customerCatAdapter.updateOne({ id, changes }, state);
    }
    case ActionsFile.CustomerCatActionType.UPDATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionsFile.CustomerCatActionType.DELETE_SUCCESS: {
      return customerCatAdapter.removeOne(action.payload, state);
    }
    case ActionsFile.CustomerCatActionType.DELETE_FAIL: {
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
const getcustomerlCatsFeatursState = createFeatureSelector<CustomerCatState>(
  "CustomerCats"
)
export const getHospitalCats = createSelector(
  getcustomerlCatsFeatursState,
  //    (state : CustomerCatState)=>state.customerCats
  customerCatAdapter.getSelectors().selectAll

)
export const getHospitalCatsLoading = createSelector(
  getcustomerlCatsFeatursState,
  (state: CustomerCatState) => state.loading
)
export const getHospitalCatsLoaded = createSelector(
  getcustomerlCatsFeatursState,
  (state: CustomerCatState) => state.loaded
)
export const getHospitalCatsError = createSelector(
  getcustomerlCatsFeatursState,
  (state: CustomerCatState) => state.error
)
export const getCustomerCatsbyid = createSelector(
  getcustomerlCatsFeatursState,
  (state: CustomerCatState) => state.selectedcustomerbyId
);
export const getcurrenthospital = createSelector(
  getcustomerlCatsFeatursState,
  getCustomerCatsbyid,
  state => state.entities[state.selectedcustomerbyId]
);