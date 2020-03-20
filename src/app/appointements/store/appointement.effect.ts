import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppointetmentService } from '../appointetment.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as appsActions from './appointement.actions'
import { Appointement } from '../appointement.model';
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from '@ngrx/store';

@Injectable()
export class AppointementEffect {

    constructor
        (
            private service: AppointetmentService,
            private actions$: Actions
        ) { }

    /******************************get All Appointements************************************** */
    @Effect()
    LoadAppointement$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.LoadAppointements>(
            appsActions.AppointementActionTypes.LOAD_APPOINTEMENTS
        ),
        mergeMap((actions: appsActions.LoadAppointements) =>
            this.service.getAppointements().pipe(
                map((appointements: Appointement[]) =>
                    new appsActions.LoadAppointementsSuccess(appointements)
                ),
                catchError(err => of(new appsActions.LoadAppointementsFailed(err)))
            )
        )
    )
}
