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
       ofType<ActionsFile.LoadProductCat>(
           ActionsFile.ProductCatActionType.LOAD
       ),
       mergeMap((Actions : ActionsFile.LoadProductCat)=>
       this.ProductCatServ.getAll().pipe(
           map(
               (ProductCats : productCat[])=>
               new ActionsFile.LoadProductCatSuccess(ProductCats)
           ),
           catchError(err =>of(new ActionsFile.LoadProductCatFail(err)))
       )
       )
   )
 

     //Create Hospital Category

     @Effect()
   CreateProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.CreateProductCat>(
           ActionsFile.ProductCatActionType.CREATE
       ),
       map((Actions : ActionsFile.CreateProductCat)=>Actions.payload),
       mergeMap((ProductCateg : productCat )=>
       this.ProductCatServ.add(ProductCateg ).pipe(
           map(
               (NewProductCats : productCat)=>
               new ActionsFile.CreateProductCatSuccess(NewProductCats)
           ),
           catchError(err =>of(new ActionsFile.CreateProductCatFail(err)))
       )
       )
   );
  
   @Effect()
   UpdateProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.UpdateProductCat>(
           ActionsFile.ProductCatActionType.UPDATE
       ),
       map((Actions : ActionsFile.UpdateProductCat)=>Actions.payload),
       mergeMap((payload : productCat )=>
       this.ProductCatServ.update(payload).pipe(
           map(
               (payloadResult : productCat)=>new ActionsFile.UpdateProductCatSuccess(payload)
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateProductCatFail(err))
       )
       )
   ));  

   @Effect()
   DeleteProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.DeleteProductCat>(
           ActionsFile.ProductCatActionType.DELETE
       ),
       map((Actions : ActionsFile.DeleteProductCat)=>Actions.payload),
       mergeMap((id:string)=>
       this.ProductCatServ.delete(id ).pipe(
           map(()=>new ActionsFile.DeleteProductCatSuccess(id)),
           catchError(err =>of(new ActionsFile.DeleteProductCatFail(err)))
       )
       )
   );

}
