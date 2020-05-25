import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError, tap} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/customerCategorie/Store/Action'
import { customerCat } from '../customerCat.Module';
import { CustomerCatService } from '../customerCat.service';


@Injectable()
export class CustomerCatEffect {
    constructor(private actions$ : Actions,
        private CustomerCatServ : CustomerCatService)
   {
   }


   @Effect()
   LoadCustomerCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Load>(
           ActionsFile.CustomerCatActionType.LOAD
       ),
       mergeMap((Actions : ActionsFile.Load)=>
       this.CustomerCatServ.getAll().pipe(
           map(
               (CustomerCats : customerCat[])=>
               new ActionsFile.LoadSuccess(CustomerCats)
           ),
           catchError(err =>of(new ActionsFile.LoadFail(err)))
       )
       )
   )
 

     //Create Customer Category

     @Effect()
   CreateCustomerCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Create>(
           ActionsFile.CustomerCatActionType.CREATE
       ),
       map((Actions : ActionsFile.Create)=>Actions.payload),
       mergeMap((CustomerCateg : customerCat )=>
       this.CustomerCatServ.add(CustomerCateg ).pipe(
           map(
               (NewCustomerCats : customerCat)=>
               new ActionsFile.CreateSuccess(NewCustomerCats)
           ),
           catchError(err =>of(new ActionsFile.CreateFail(err)))
       )
       )
   );
  
   @Effect()
   UpdateCustomerCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Update>(
           ActionsFile.CustomerCatActionType.UPDATE
       ),
       map((Actions : ActionsFile.Update)=>Actions.payload),
       mergeMap((payload : customerCat )=>
       this.CustomerCatServ.update(payload).pipe(
           map(
               (payloadResult : customerCat)=>new ActionsFile.UpdateSuccess(payload)
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateFail(err))
       )
       )
   ));  

   @Effect()
   DeleteCustomerCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Delete>(
           ActionsFile.CustomerCatActionType.DELETE
       ),
       map((Actions : ActionsFile.Delete)=>Actions.payload),
       mergeMap((id:string)=>
       this.CustomerCatServ.delete(id ).pipe(
           map(()=>new ActionsFile.DeleteSuccess(id)),
           catchError(err =>of(new ActionsFile.DeleteFail(err)))
       )
       )
   );

}
