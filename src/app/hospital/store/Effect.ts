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

}
