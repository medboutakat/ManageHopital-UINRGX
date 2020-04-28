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
       ofType<ActionsFile.LoadDoctorCat>(
           ActionsFile.DoctorCatActionType.LOAD
       ),
       mergeMap((Actions : ActionsFile.LoadDoctorCat)=>
       this.DoctorCatServ.getAll().pipe(
           map(
               (HospitalCats : doctorCat[])=>
               new ActionsFile.LoadDoctorCatSuccess(HospitalCats)
           ),
           catchError(err =>of(new ActionsFile.LoadDoctorCatFail(err)))
       )
       )
   )
 

     //Create Hospital Category

     @Effect()
   CreateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.CreateDoctorCat>(
           ActionsFile.DoctorCatActionType.CREATE
       ),
       map((Actions : ActionsFile.CreateDoctorCat)=>Actions.payload),
       mergeMap((HospitalCateg : doctorCat )=>
       this.DoctorCatServ.add(HospitalCateg ).pipe(
           map(
               (NewHospitalCats : doctorCat)=>
               new ActionsFile.CreateDoctorCatSuccess(NewHospitalCats)
           ),
           catchError(err =>of(new ActionsFile.CreateDoctorCatFail(err)))
       )
       )
   );
  
   @Effect()
   UpdateHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.UpdateDoctorCat>(
           ActionsFile.DoctorCatActionType.UPDATE
       ),
       map((Actions : ActionsFile.UpdateDoctorCat)=>Actions.payload),
       mergeMap((payload : doctorCat )=>
       this.DoctorCatServ.update(payload).pipe(
           map(
               (payloadResult : doctorCat)=>new ActionsFile.UpdateDoctorCatSuccess(payload)
           ), 
           tap((data) => {
                    console.log(data);
           }),
          catchError(err =>of(new ActionsFile.UpdateDoctorCatFail(err))
       )
       )
   ));  

   @Effect()
   DeleteHospitalCat$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.DeleteDoctorCat>(
           ActionsFile.DoctorCatActionType.DELETE
       ),
       map((Actions : ActionsFile.DeleteDoctorCat)=>Actions.payload),
       mergeMap((id:string)=>
       this.DoctorCatServ.delete(id ).pipe(
           map(()=>new ActionsFile.DeleteDoctorCatSuccess(id)),
           catchError(err =>of(new ActionsFile.DeleteDoctorCatFail(err)))
       )
       )
   );

}
