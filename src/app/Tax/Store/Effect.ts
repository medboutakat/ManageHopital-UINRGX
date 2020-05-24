import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError, tap} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/Tax/Store/Action'
import { Tax } from '../tax.Module';
import { TaxService } from '../Tax.service';


@Injectable()
export class TaxEffect {
    constructor(private actions$ : Actions,
        private TaxServ : TaxService)
   {
   }


   @Effect()
   LoadHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Load>(
           ActionsFile.TaxActionType.LOAD
       ),
       mergeMap((Actions : ActionsFile.Load)=>
       this.TaxServ.getAll().pipe(
           map(
               (HospitalCats : Tax[])=>
               new ActionsFile.LoadSuccess(HospitalCats)
           ),
           catchError(err =>of(new ActionsFile.LoadFail(err)))
       )
       )
   )
 

     //Create Hospital Category

     @Effect()
   CreateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Create>(
           ActionsFile.TaxActionType.CREATE
       ),
       map((Actions : ActionsFile.Create)=>Actions.payload),
       mergeMap((HospitalCateg : Tax )=>
       this.TaxServ.add(HospitalCateg ).pipe(
           map(
               (NewHospitalCats : Tax)=>
               new ActionsFile.CreateSuccess(NewHospitalCats)
           ),
           catchError(err =>of(new ActionsFile.CreateFail(err)))
       )
       )
   );
  
   @Effect()
   UpdateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Update>(
           ActionsFile.TaxActionType.UPDATE
       ),
       map((Actions : ActionsFile.Update)=>Actions.payload),
       mergeMap((payload : Tax )=>
       this.TaxServ.update(payload).pipe(
           map(
               (payloadResult : Tax)=>new ActionsFile.UpdateSuccess(payload)
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateFail(err))
       )
       )
   ));  

   @Effect()
   DeleteHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Delete>(
           ActionsFile.TaxActionType.DELETE
       ),
       map((Actions : ActionsFile.Delete)=>Actions.payload),
       mergeMap((id:string)=>
       this.TaxServ.delete(id ).pipe(
           map(()=>new ActionsFile.DeleteSuccess(id)),
           catchError(err =>of(new ActionsFile.DeleteFail(err)))
       )
       )
   );

}
