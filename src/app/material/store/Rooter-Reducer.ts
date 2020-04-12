import * as fromRouter from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getHospitalCats } from 'src/app/HospitalCategorie/Store/reducer';
 
export interface State {
  router: fromRouter.RouterReducerState<any>;
}
 
export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');
 
export const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);
 
export const selectSelectedCarId = selectQueryParam('id');

export const selectMaterial = createSelector(
    getHospitalCats,selectSelectedCarId,(materials, materialId) => materials[materialId]
);



 
// export const selectCarsByColor = createSelector(
//     getHospitalCats,
//    selectQueryParams,
//    (cars, params) => cars.filter(c => c.id === params['id'])
// );