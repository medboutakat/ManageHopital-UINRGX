import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError, tap} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/ProductCategorie/Store/Action'
import { productCat } from '../productCat.Module';
import { productCatService } from '../productCat.service';


@Injectable()
export class ProductCatEffect {
    constructor(private actions$ : Actions,
        private ProductCatServ : productCatService)
   {
   }


   @Effect()
   LoadProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Load>(
           ActionsFile.ProductCatActionType.LOAD
       ),
       mergeMap((Actions : ActionsFile.Load)=>
       this.ProductCatServ.getAll().pipe(
           map(
               (ProductCats : productCat[])=>
               new ActionsFile.LoadSuccess(ProductCats)
           ),
           catchError(err =>of(new ActionsFile.LoadFail(err)))
       )
       )
   )
 

     //Create Hospital Category

     @Effect()
   CreateProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Create>(
           ActionsFile.ProductCatActionType.CREATE
       ),
       map((Actions : ActionsFile.Create)=>Actions.payload),
       mergeMap((ProductCateg : productCat )=>
       this.ProductCatServ.add(ProductCateg ).pipe(
           map(
               (NewProductCats : productCat)=>
               new ActionsFile.CreateSuccess(NewProductCats)
           ),
           catchError(err =>of(new ActionsFile.CreateFail(err)))
       )
       )
   );
  
   @Effect()
   UpdateProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Update>(
           ActionsFile.ProductCatActionType.UPDATE
       ),
       map((Actions : ActionsFile.Update)=>Actions.payload),
       mergeMap((payload : productCat )=>
       this.ProductCatServ.update(payload).pipe(
           map(
               (payloadResult : productCat)=>new ActionsFile.UpdateSuccess(payload)
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateFail(err))
       )
       )
   ));  

   @Effect()
   DeleteProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Delete>(
           ActionsFile.ProductCatActionType.DELETE
       ),
       map((Actions : ActionsFile.Delete)=>Actions.payload),
       mergeMap((id:string)=>
       this.ProductCatServ.delete(id ).pipe(
           map(()=>new ActionsFile.DeleteSuccess(id)),
           catchError(err =>of(new ActionsFile.DeleteFail(err)))
       )
       )
   );

}
