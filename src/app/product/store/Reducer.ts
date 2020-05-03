import * as ActionsFile from 'src/app/Product/store/Action'
import * as fromRoot from 'src/app/product/store/app-state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityAdapter ,createEntityAdapter ,EntityState} from '@ngrx/entity';
import { Product } from '../product.model';


export interface ProductState extends EntityState<Product>{
    selectedProductbyId : string | null,
    Products:Product[],
    loading: boolean,
    loaded : boolean,
    error : string
}

export interface AppState extends fromRoot.AppState{
    ProductCats : ProductState
}

export const ProductAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();
export const DefaulttProduct : ProductState={
    ids :[],
    entities :{},
    Products:[],
    selectedProductbyId : null,
    loading: false,
    loaded : false,
    error : ' ',
}
// export const initialState : ProductCatState ={
//     ProductCats :[],
//     loading: false,
//     loaded : false,
//     error : ' ',
// }
export const initialState = ProductAdapter.getInitialState(DefaulttProduct)

export function ProductReducer(state = initialState, action : ActionsFile.ProductAction) : ProductState{
      switch(action.type){
   
        case ActionsFile.ProductActionType.LOAD_SUCCESS: {
            return ProductAdapter.addAll(action.payload, {
              ...state,
              loading: false,
              loaded: true,
              Products:action.payload
            });
          }
      
          case ActionsFile.ProductActionType.LOAD_FAIL: {
            return {
              ...state,
              loading: false,
              entities: {},
              loaded: false,
              error: action.payload,
            };
          }

          case ActionsFile.ProductActionType.CREATE_SUCCESS: {
            return ProductAdapter.addOne(action.payload, state);
          }
          case ActionsFile.ProductActionType.CREATE_FAIL: {
            return {
              ...state,
              error: action.payload,
            };
          }

          case ActionsFile.ProductActionType.UPDATE_SUCCESS: { 
            const changes = action.payload;
            const id = changes.id;
            console.log("updateOne:hello: ", changes)
            return ProductAdapter.updateOne({ id,changes } , state);
          }
          case ActionsFile.ProductActionType.UPDATE_FAIL: {
            return {
              ...state,
              error: action.payload,
            };
          }

          case ActionsFile.ProductActionType.DELETE_SUCCESS: {
            return ProductAdapter.removeOne(action.payload, state);
          }
          case ActionsFile.ProductActionType.DELETE_FAIL: {
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
  

  const getProductsFeatursState = createFeatureSelector<ProductState>(
      "Products"
  )
   export const getProducts = createSelector(
       getProductsFeatursState,
    //    (state : ProductCatState)=>state.ProductCats
      ProductAdapter.getSelectors().selectAll
   )
   export const getProductsLoading = createSelector(
    getProductsFeatursState,
    (state : ProductState)=>state.loading
)
export const getProductsLoaded = createSelector(
    getProductsFeatursState,
    (state : ProductState)=>state.loaded
)
export const getProductsError = createSelector(
    getProductsFeatursState,
    (state : ProductState)=>state.error
)
export const getProductsbyid = createSelector(
    getProductsFeatursState,
    (state :ProductState)=>state.selectedProductbyId
);
export const getcurrentProduct = createSelector(
    getProductsFeatursState,
    getProductsbyid,
    state => state.entities[state.selectedProductbyId]
);
