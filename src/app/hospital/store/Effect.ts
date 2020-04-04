import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError} from 'rxjs/operators';
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
  LoadHospital$: Observable<Action> = this.actions$.pipe(
      ofType<ActionsFile.LoadHospital>(
          ActionsFile.HospitalActionType.LOAD_Hospital
      ),
      mergeMap((Actions : ActionsFile.LoadHospital)=>
      this.HospitalServ.getHospitalCats().pipe(
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
   CreateHospital$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.CreateHospital>(
           ActionsFile.HospitalActionType.CREATE_Hospital
       ),
       map((Actions : ActionsFile.CreateHospital)=>Actions.payload),
       mergeMap((HospitalCateg : Hospital )=>
       this.HospitalServ.createHospital(HospitalCateg ).pipe(
           map(
               (NewHospitalCats : Hospital)=>
               new ActionsFile.CreateHospitalSuccess(NewHospitalCats)
           ),
           catchError(err =>of(new ActionsFile.CreateHospitalFail(err)))
       )
       )
   );
 
   //Update HospitalCategory
 
//    @Effect()
//    UpdateHospital$: Observable<Action> = this.actions$.pipe(
//        ofType<ActionsFile.UpdateHospital>(
//            ActionsFile.HospitalActionType.UPDATE_Hospital
//        ),
//        map((Actions : ActionsFile.UpdateHospital)=>Actions.payload),
//        mergeMap((HospitalCateg : Hospital )=>
//        this.HospitalServ. updateHospital(HospitalCateg ).pipe(
//            map(
//                (updateHospitalCats : Hospital)=>
//                new ActionsFile.CreateHospitalSuccess({
//                    id:updateHospitalCats.id,
//                    name:updateHospitalCats.name,
//                    remark:updateHospitalCats.remark,
//                }),
//            catchError(err =>of(new ActionsFile.UpdateHospitalCatFail(err)))
//        )
//        )
//    ));
 
    //Delete Hospital Category
 
    @Effect()
    DeleteHospital$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.DeleteHospital>(
            ActionsFile.HospitalActionType.DELETE_Hospital
        ),
        map((Actions : ActionsFile.DeleteHospital)=>Actions.payload),
        mergeMap((id:string)=>
        this.HospitalServ.deleteHospital(id).pipe(
            map(()=>new ActionsFile.DeleteHospitalSuccess()),
            catchError(err =>of(new ActionsFile.DeleteHospitalFail(err)))
        )
        )
    );
 }
 