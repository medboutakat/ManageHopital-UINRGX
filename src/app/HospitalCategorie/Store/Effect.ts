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
      ofType<ActionsFile.LoadHospitalCat>(
          ActionsFile.HospitalCatActionType.LOAD
      ),
      mergeMap((Actions : ActionsFile.LoadHospitalCat)=>
      this.HospitalCatServ.getAll().pipe(
          map(
              (HospitalCats : HospitalCat[])=>
              new ActionsFile.LoadHospitalCatSuccess(HospitalCats)
          ),
          catchError(err =>of(new ActionsFile.LoadHospitalCatFail(err)))
      )
      )
  )

   //Create Hospital Category

   @Effect()
   CreateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.CreateHospitalCat>(
           ActionsFile.HospitalCatActionType.CREATE
       ),
       map((Actions : ActionsFile.CreateHospitalCat)=>Actions.payload),
       mergeMap((HospitalCateg : HospitalCat )=>
       this.HospitalCatServ.add(HospitalCateg ).pipe(
           map(
               (NewHospitalCats : HospitalCat)=>
               new ActionsFile.CreateHospitalCatSuccess(NewHospitalCats)
           ),
           catchError(err =>of(new ActionsFile.CreateHospitalCatFail(err)))
       )
       )
   );
  
 
   @Effect()
   UpdateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.UpdateHospitalCat>(
           ActionsFile.HospitalCatActionType.UPDATE
       ),
       map((Actions : ActionsFile.UpdateHospitalCat)=>Actions.payload),
       mergeMap((payload : HospitalCat )=>
       this.HospitalCatServ. update(payload).pipe(
           map(
               (payload : HospitalCat)=>               
               new ActionsFile.UpdateHospitalCatSuccess("Succcess")
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateHospitalCatFail(err))
       )
       )
   )); 

    //Delete Hospital Category
 
    @Effect()
    DeleteHospitalCat$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.DeleteHospitalCat>(
            ActionsFile.HospitalCatActionType.DELETE
        ),
        map((Actions : ActionsFile.DeleteHospitalCat)=>Actions.payload),
        mergeMap((id:string)=>
        this.HospitalCatServ.delete(id ).pipe(
            map(()=>new ActionsFile.DeleteHospitalCatSuccess(id)),
            catchError(err =>of(new ActionsFile.DeleteHospitalCatFail(err)))
        )
        )
    );
 }
 


