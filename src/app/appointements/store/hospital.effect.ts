import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppointetmentService } from '../appointetment.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as appsActions from './hospital.actions'
import { Hospital } from '../hospital';
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from '@ngrx/store';
import { HospitalService } from 'src/app/appointements/hospital.service';

@Injectable()
export class HospitalsEffect {

    constructor
        (
            private service: HospitalService,
            private actions$: Actions
        ) { }

    /******************************get All hospitals************************************** */
    @Effect()
    LoadHospital$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.LoadHospitals>(
            appsActions.HospitalActionTypes.LOAD_HOSPITALS
        ),
        mergeMap((actions: appsActions.LoadHospitals) =>
            this.service.getAll().pipe(
                map((hospitals: Hospital[]) =>
                    new appsActions.LoadHospitalsSuccess(hospitals)
                ),
                catchError(err => of(new appsActions.LoadHospitalsFailed(err)))
            )
        )
    )

}
