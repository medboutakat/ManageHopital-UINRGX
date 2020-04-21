import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError, tap} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/hospital/store/Action'
import { HospitalService } from '../hospital.service';
import { Hospital } from '../hospital.model';

@Injectable()
export class HospitalEffect {
    constructor(private actions$ : Actions,
        private HospitalServ : HospitalService)
   {
   }


   @Effect()
   LoadHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.LoadHospital>(
           ActionsFile.HospitalActionType.LOAD
       ),
       mergeMap((Actions : ActionsFile.LoadHospital)=>
       this.HospitalServ.getAll().pipe(
           map(
               (HospitalCats : Hospital[])=>
               new ActionsFile.LoadHospitalSuccess(HospitalCats)
           ),
           catchError(err =>of(new ActionsFile.LoadHospitalFail(err)))
       )
       )
   )
 

   //Create Hospital Category

   @Effect()
   CreateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.CreateHospital>(
           ActionsFile.HospitalActionType.CREATE
       ),
       map((Actions : ActionsFile.CreateHospital)=>Actions.payload),
       mergeMap((HospitalCateg : Hospital )=>
       this.HospitalServ.add(HospitalCateg ).pipe(
           map(
               (NewHospitalCats : Hospital)=>
               new ActionsFile.CreateHospitalSuccess(NewHospitalCats)
           ),
           catchError(err =>of(new ActionsFile.CreateHospitalFail(err)))
       )
       )
   );

   @Effect()
   UpdateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.UpdateHospital>(
           ActionsFile.HospitalActionType.UPDATE
       ),
       map((Actions : ActionsFile.UpdateHospital)=>Actions.payload),
       mergeMap((payload : Hospital )=>
       this.HospitalServ. update(payload).pipe(
           map(
               (payloadResult : Hospital)=>new ActionsFile.UpdateHospitalSuccess(payload)
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateHospitalFail(err))
       )
       )
   )); 

   //Delete Hospital Category
 
   @Effect()
   DeleteHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.DeleteHospital>(
           ActionsFile.HospitalActionType.DELETE
       ),
       map((Actions : ActionsFile.DeleteHospital)=>Actions.payload),
       mergeMap((id:string)=>
       this.HospitalServ.delete(id ).pipe(
           map(()=>new ActionsFile.DeleteHospitalSuccess(id)),
           catchError(err =>of(new ActionsFile.DeleteHospitalFail(err)))
       )
       )
   );
 }
 