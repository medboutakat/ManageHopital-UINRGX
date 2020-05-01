import * as ActionsFile from 'src/app/ProductCategorie/Store/Action'
import * as fromRoot from 'src/app/ProductCategorie/State/app-state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productCat } from '../productCat.Module';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity'; 

export interface ProductCatState extends EntityState<productCat> {
  selectedProductCatbyId: string | null,
  loading: boolean,
  loaded: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  productCats: ProductCatState
}
export const ProductCatAdapter: EntityAdapter<productCat> = createEntityAdapter<productCat>();

export const DefaultProductCat: ProductCatState = {
  ids: [],
  entities: {},
  selectedProductCatbyId: null,
  loading: false,
  loaded: false,
  error: ' ',
}
// export const initialState : ProductCatState ={
//     ProductCats :[],
//     loading: false,
//     loaded : false,
//     error : ' ',
// }
export const initialState = ProductCatAdapter.getInitialState(DefaultProductCat)

export function ProductCatReducer(state = initialState, action: ActionsFile.ProductCatction): ProductCatState {
  switch (action.type) {
    case ActionsFile.ProductCatActionType.LOAD_SUCCESS: {
      return ProductCatAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,

      });
    }
    case ActionsFile.ProductCatActionType.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        entities: {},
        loaded: false,
        error: action.payload
      }
    }
    case ActionsFile.ProductCatActionType.CREATE_SUCCESS: {
      return ProductCatAdapter.addOne(action.payload, state);
    }
    case ActionsFile.ProductCatActionType.CREATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionsFile.ProductCatActionType.UPDATE_SUCCESS: {
      const changes = action.payload;
      const id = changes.id;
      console.log("updateOne:hello: ", changes)
      return ProductCatAdapter.updateOne({ id, changes }, state);
    }
    case ActionsFile.ProductCatActionType.UPDATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionsFile.ProductCatActionType.DELETE_SUCCESS: {
      return ProductCatAdapter.removeOne(action.payload, state);
    }
    case ActionsFile.ProductCatActionType.DELETE_FAIL: {
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
const getProductCatlCatsFeatursState = createFeatureSelector<ProductCatState>(
  "ProductCats"
)
export const getHospitalCats = createSelector(
  getProductCatlCatsFeatursState,
  //    (state : ProductCatState)=>state.ProductCats
  ProductCatAdapter.getSelectors().selectAll

)
export const getHospitalCatsLoading = createSelector(
  getProductCatlCatsFeatursState,
  (state: ProductCatState) => state.loading
)
export const getHospitalCatsLoaded = createSelector(
  getProductCatlCatsFeatursState,
  (state: ProductCatState) => state.loaded
)
export const getHospitalCatsError = createSelector(
  getProductCatlCatsFeatursState,
  (state: ProductCatState) => state.error
)
export const getProductCatsbyid = createSelector(
  getProductCatlCatsFeatursState,
  (state: ProductCatState) => state.selectedProductCatbyId
);
export const getcurrenthospital = createSelector(
  getProductCatlCatsFeatursState,
  getProductCatsbyid,
  state => state.entities[state.selectedProductCatbyId]
);