import * as ActionsFile from "src/app/CustomerCategorie/Store/Action";
import * as fromRoot from "src/app/CustomerCategorie/Store/app-state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerCat } from "../customer-cat.model";
import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";

export interface CustomerCatState extends EntityState<CustomerCat> {
  selectById: string | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  CustomerCats: CustomerCatState;
}

export const CustomerCatAdapter: EntityAdapter<CustomerCat> = createEntityAdapter<
  CustomerCat
>();
export const DefaulttCustomerCat: CustomerCatState = {
  ids: [],
  entities: {},
  selectById: null,
  loading: false,
  loaded: false,
  error: " ",
};
export const initialState = CustomerCatAdapter.getInitialState(
  DefaulttCustomerCat
);

export function CustomerCatReducer(
  state = initialState,
  action: ActionsFile.CustomerCatAction
): CustomerCatState {
  switch (action.type) {
    case ActionsFile.CustomerCatActionType.LOAD_SUCCESS: {
      return CustomerCatAdapter.addAll(action.payload, {
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
        error: action.payload,
      };
    }
    case ActionsFile.CustomerCatActionType.CREATE_SUCCESS: {
      return CustomerCatAdapter.addOne(action.payload, state);
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
      return CustomerCatAdapter.updateOne({ id,changes } , state);
    }
    case ActionsFile.CustomerCatActionType.UPDATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionsFile.CustomerCatActionType.DELETE_SUCCESS: {
      return CustomerCatAdapter.removeOne(action.payload, state);
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

const getCustomerCatsFeatursState = createFeatureSelector<CustomerCatState>(
  "CustomerCats"
);

export const getCustomerCats = createSelector(
  getCustomerCatsFeatursState,
  CustomerCatAdapter.getSelectors().selectAll
);
export const getCustomerCatsLoading = createSelector(
  getCustomerCatsFeatursState,
  (state: CustomerCatState) => state.loading
);
export const getCustomerCatsLoaded = createSelector(
  getCustomerCatsFeatursState,
  (state: CustomerCatState) => state.loaded
);
export const getCustomerCatsError = createSelector(
  getCustomerCatsFeatursState,
  (state: CustomerCatState) => state.error
);
export const getCustomerCatsbyid = createSelector(
  getCustomerCatsFeatursState,
  (state: CustomerCatState) => state.selectById
);
export const getcurrenthospital = createSelector(
  getCustomerCatsFeatursState,
  getCustomerCatsbyid,
  (state) => state.entities[state.selectById]
);
