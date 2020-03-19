import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action'
import { doctorCat } from '../doctorCat.module';
import { DoctorCatService } from '../doctorCat.service';


@Injectable()
export class DoctorCatEffect {
    constructor(private actions$ : Actions,
        private DoctorCatServ : DoctorCatService)
   {
   }

  @Effect()
  LoadDoctorCat$: Observable<Action> = this.actions$.pipe(
      ofType<ActionsFile.LoadDoctorCat>(
          ActionsFile.DoctorCatActionType.LOAD_DoctorCat
      ),
      mergeMap((Actions : ActionsFile.LoadDoctorCat)=>
      this.DoctorCatServ.getDoctorCat().pipe(
          map(
              (DoctorCats : doctorCat[])=>
              new ActionsFile.LoadDoctorCatSuccess(DoctorCats)
          ),
          catchError(err =>of(new ActionsFile.LoadDoctorCatFail(err)))
      )
      )
  )

}
