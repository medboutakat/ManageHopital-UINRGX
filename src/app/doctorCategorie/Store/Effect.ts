import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError, tap} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/doctorCategorie/Store/Action'
import { doctorCat } from '../doctorCat.module';
import { DoctorCatService } from '../doctorCat.service';


@Injectable()
export class DoctorCatEffect {
    constructor(private actions$ : Actions,
        private DoctorCatServ : DoctorCatService)
   {
   }


   @Effect()
   LoadHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Load>(
           ActionsFile.DoctorCatActionType.LOAD
       ),
       mergeMap((Actions : ActionsFile.Load)=>
       this.DoctorCatServ.getAll().pipe(
           map(
               (HospitalCats : doctorCat[])=>
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
           ActionsFile.DoctorCatActionType.CREATE
       ),
       map((Actions : ActionsFile.Create)=>Actions.payload),
       mergeMap((HospitalCateg : doctorCat )=>
       this.DoctorCatServ.add(HospitalCateg ).pipe(
           map(
               (NewHospitalCats : doctorCat)=>
               new ActionsFile.CreateSuccess(NewHospitalCats)
           ),
           catchError(err =>of(new ActionsFile.CreateFail(err)))
       )
       )
   );
  
   @Effect()
   UpdateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.Update>(
           ActionsFile.DoctorCatActionType.UPDATE
       ),
       map((Actions : ActionsFile.Update)=>Actions.payload),
       mergeMap((payload : doctorCat )=>
       this.DoctorCatServ.update(payload).pipe(
           map(
               (payloadResult : doctorCat)=>new ActionsFile.UpdateSuccess(payload)
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
           ActionsFile.DoctorCatActionType.DELETE
       ),
       map((Actions : ActionsFile.Delete)=>Actions.payload),
       mergeMap((id:string)=>
       this.DoctorCatServ.delete(id ).pipe(
           map(()=>new ActionsFile.DeleteSuccess(id)),
           catchError(err =>of(new ActionsFile.DeleteFail(err)))
       )
       )
   );

}
