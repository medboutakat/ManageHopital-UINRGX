import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError, tap} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/Product/store/Action'
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Injectable()
export class ProductEffect {
    constructor(private actions$ : Actions,
        private ProductServ : ProductService)
   {
   }

   //Create  
   @Effect()
   LoadProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Load>(
           ActionsFile.ProductActionType.LOAD
       ),
       mergeMap((Actions : ActionsFile.Load)=>
       this.ProductServ.getAll().pipe(
           map(
               (ProductCats : Product[])=>
               new ActionsFile.LoadSuccess(ProductCats)
           ),
           catchError(err =>of(new ActionsFile.LoadFail(err)))
       )
       )
   )
 

   //Create  
   @Effect()
   CreateProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Create>(
           ActionsFile.ProductActionType.CREATE
       ),
       map((Actions : ActionsFile.Create)=>Actions.payload),
       mergeMap((ProductCateg : Product )=>
       this.ProductServ.add(ProductCateg ).pipe(
           map(
               (NewProductCats : Product)=>
               new ActionsFile.CreateSuccess(NewProductCats)
           ),
           catchError(err =>of(new ActionsFile.CreateFail(err)))
       )
       )
   );

   @Effect()
   UpdateProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Update>(
           ActionsFile.ProductActionType.UPDATE
       ),
       map((Actions : ActionsFile.Update)=>Actions.payload),
       mergeMap((payload : Product )=>
       this.ProductServ. update(payload).pipe(
           map(
               (payloadResult : Product)=>new ActionsFile.UpdateSuccess(payload)
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateProductFail(err))
       )
       )
   )); 

   //Delete  
   @Effect()
   DeleteProductCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Delete>(
           ActionsFile.ProductActionType.DELETE
       ),
       map((Actions : ActionsFile.Delete)=>Actions.payload),
       mergeMap((id:string)=>
       this.ProductServ.delete(id ).pipe(
           map(()=>new ActionsFile.DeleteSuccess(id)),
           catchError(err =>of(new ActionsFile.DeleteFail(err)))
       )
       )
   );
 }
 