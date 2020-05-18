import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../product.Module';
import * as fromRoot from 'src/app/Products/store/app-state'
import * as ActionsFile from 'src/app/Products/store/Action'

export interface ProductState extends EntityState<Product> {
  selectedById: string | null,
  loading: boolean,
  loaded: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  products: ProductState,
}

export const ProductAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();
export const DefaultState: ProductState = {
  ids: [],
  entities: {},
  selectedById: null,
  loading: false,
  loaded: false,
  error: '',
}
// export const initialState : HospitalCatState ={
//     HospitalCats :[],
//     loading: false,
//     loaded : false,
//     error : ' ',
// }
export const initialState = ProductAdapter.getInitialState(DefaultState)

export function ProductReducer(state = initialState, action: ActionsFile.ProductAction): ProductState {
  switch (action.type) {

    case ActionsFile.ProductActionType.LOAD_SUCCESS: {
      return ProductAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case ActionsFile.ProductActionType.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        entities: {},
        loaded: false,
        error: action.payload
      }
    }

    case ActionsFile.ProductActionType.LOAD_ONE_SUCCESS: {
      return ProductAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id
      });
    }
    case ActionsFile.ProductActionType.LOAD_ONE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ActionsFile.ProductActionType.LOAD_ONE_BY_NAME_SUCCESS: {
      return ProductAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.name
      });
    }
    case ActionsFile.ProductActionType.LOAD_ONE_BY_NAME_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ActionsFile.ProductActionType.CREATE_SUCCESS: {
      return ProductAdapter.addOne(action.payload, state);
    }
    case ActionsFile.ProductActionType.CREATE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case ActionsFile.ProductActionType.UPDATE_SUCCESS: {
      return ProductAdapter.updateOne(action.payload, state);
    }
    case ActionsFile.ProductActionType.UPDATE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ActionsFile.ProductActionType.DELETE_SUCCESS: {
      return ProductAdapter.removeOne(action.payload, state);
    }
    case ActionsFile.ProductActionType.DELETE_FAIL: {
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


const getProductFeatursState = createFeatureSelector<ProductState>(
  "Product"
)
export const getProducts = createSelector(
  getProductFeatursState,
  (state : ProductState)=>state.entities
  //ProductAdapter.getSelectors().selectAll
)
export const getProductsLoading = createSelector(
  getProductFeatursState,
  (state: ProductState) => state.loading
)
export const getProductsLoaded = createSelector(
  getProductFeatursState,
  (state: ProductState) => state.loaded
)
export const getProductsError = createSelector(
  getProductFeatursState,
  (state: ProductState) => state.error
)
export const getProductbyid = createSelector(
  getProductFeatursState,
  (state: ProductState) => state.selectedById
);
export const getcurrentProduct = createSelector(
  getProductFeatursState,
  getProductbyid,
  state => state.entities[state.selectedById]
);
