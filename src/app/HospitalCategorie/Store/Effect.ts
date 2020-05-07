import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError, tap} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { HospitalCatService } from '../hospitalCat.service';
import { HospitalCat } from '../hospitalCat.model';

@Injectable()
export class HospitalCatEffect {
    constructor(private actions$ : Actions,
        private HospitalCatServ : HospitalCatService)
   {
   }

  @Effect()
  LoadHospitalCat$: Observable<Action> = this.actions$.pipe(
      ofType<ActionsFile.Load>(
          ActionsFile.HospitalCatActionType.LOAD
      ),
      mergeMap((Actions : ActionsFile.Load)=>
      this.HospitalCatServ.getAll().pipe(
          map(
              (HospitalCats : HospitalCat[])=>
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
           ActionsFile.HospitalCatActionType.CREATE
       ),
       map((Actions : ActionsFile.Create)=>Actions.payload),
       mergeMap((HospitalCateg : HospitalCat )=>
       this.HospitalCatServ.add(HospitalCateg ).pipe(
           map(
               (NewHospitalCats : HospitalCat)=>
               new ActionsFile.CreateSuccess(NewHospitalCats)
           ),
           catchError(err =>of(new ActionsFile.CreateFail(err)))
       )
       )
   );
  
 
   @Effect()
   UpdateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Update>(
           ActionsFile.HospitalCatActionType.UPDATE
       ),
       map((Actions : ActionsFile.Update)=>Actions.payload),
       mergeMap((payload : HospitalCat )=>
       this.HospitalCatServ. update(payload).pipe(
           map(
               (payloadResult : HospitalCat)=>new ActionsFile.UpdateSuccess(payload)
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateFail(err))
       )
       )
   )); 

    //Delete Hospital Category
 
    @Effect()
    DeleteHospitalCat$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.Delete>(
            ActionsFile.HospitalCatActionType.DELETE
        ),
        map((Actions : ActionsFile.Delete)=>Actions.payload),
        mergeMap((id:string)=>
        this.HospitalCatServ.delete(id ).pipe(
            map(()=>new ActionsFile.DeleteSuccess(id)),
            catchError(err =>of(new ActionsFile.DeleteFail(err)))
        )
        )
    );
 }
 


