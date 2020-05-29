import { createFeatureSelector, createSelector, State } from "@ngrx/store"
import { EntityAdapter, createEntityAdapter, EntityState, Update } from "@ngrx/entity"
import * as fromRoot from '../customer-store/app-state';
import * as customerActions from './action';
import { Customer } from '../customer.model';

export interface customerState extends EntityState<Customer> {
  selectedById: string | null,
  loadSeccess: boolean,
  getting: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  customers: customerState
}
export const CustomerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();
export const DefaultState: customerState = {
  ids: [],
  entities: {},
  selectedById: null,
  loadSeccess: false,
  getting: false,
  error: " "
}

export interface AppSate extends fromRoot.AppState {
  customers: customerState
}
export const initialState = CustomerAdapter.getInitialState(DefaultState);
//reducer
export function customerReducer(state = initialState, action: customerActions.CustomAction): customerState {
  switch (action.type) {

    case customerActions.CustomerActionType.LOAD_SUCCESS: {
      return CustomerAdapter.addAll(action.payload, {
        ...state,
        loadSeccess: false,
        getting: true,

      });
    }
    case customerActions.CustomerActionType.LOAD_FAIL: {
      return {
        ...state,
        entities: {},
        getting: false,
        loadSeccess: false,
        error: action.payload
      }
    }
    /*******************************delete Customer***************************************************** */
    case customerActions.CustomerActionType.DELETE_SUCCESS: {
      return CustomerAdapter.removeOne(action.payload, state)

    }
    case customerActions.CustomerActionType.DELETE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    /**********************************create Customer********************************************************************* */
    case customerActions.CustomerActionType.CREATE_SUCCESS: {
      return CustomerAdapter.addOne(action.payload, state);
    }
    case customerActions.CustomerActionType.CREATE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    /************************Update Customer********************************* */


    case customerActions.CustomerActionType.UPDATE_SUCCESS: {
      const changes = action.payload;
      const id = changes.id;
      return CustomerAdapter.updateOne({ id, changes }, state);
    }
    case customerActions.CustomerActionType.UPDATE_FAIL: {
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

