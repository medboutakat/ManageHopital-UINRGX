import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { HospitalCatService } from '../hospitalCat.servic';
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
          ActionsFile.HospitalCatActionType.LOAD_HospitalCat
      ),
      mergeMap((Actions : ActionsFile.LoadHospitalCat)=>
      this.HospitalCatServ.getHospitalCats().pipe(
          map(
              (HospitalCats : HospitalCat[])=>
              new ActionsFile.LoadHospitalCatSuccess(HospitalCats)
          ),
          catchError(err =>of(new ActionsFile.LoadHospitalCatFail(err)))
      )
      )
  )

}
