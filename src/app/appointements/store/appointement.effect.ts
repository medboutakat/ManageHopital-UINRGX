import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppointetmentService } from '../appointetment.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as appsActions from './appointement.actions'
import { Appointement } from '../appointement.model';
import { map, mergeMap, catchError, tap } from "rxjs/operators";
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
            this.service.getAll().pipe(
                map((appointements: Appointement[]) =>
                    new appsActions.LoadAppointementsSuccess(appointements)
                ),
                catchError(err => of(new appsActions.LoadAppointementsFailed(err)))
            )
        )
    )
    /*****************************Delete appointement******************************************** */
    @Effect()
    DeleteAppointement$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.DeleteAppointement>(
            appsActions.AppointementActionTypes.DELETE_APPOINTEMENT
        ),
        map((action: appsActions.DeleteAppointement) => action.payload),
        mergeMap((id) =>
            this.service.delete(id).pipe(
                map(() =>
                    new appsActions.DeleteAppointementSuccess(id)
                ),
                catchError(err => of(new appsActions.DeleteAppointementFail(err)))
            )
        )
    )
    /***************************create appointement***************************************************** */
    @Effect()
    createAppointement$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.CreateAppointement>(
            appsActions.AppointementActionTypes.CREATE_APPOINTEMENT
        ),
        map((action: appsActions.CreateAppointement) => action.payload),
        mergeMap((apps: Appointement) =>
            this.service.add(apps).pipe(
                map(
                    (newApp: Appointement) =>
                        new appsActions.CreateAppointementSuccess(newApp)
                ),
                catchError(err => of(new appsActions.CreateAppointementFail(err)))
            )
        )
    );


    @Effect()
    UpdateAppointement$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.UpdateAppointements>(
            appsActions.AppointementActionTypes.UPDATE
        ),
        map((Actions : appsActions.UpdateAppointements)=>Actions.payload),
        mergeMap((payload : Appointement )=>
        this.service. update(payload).pipe(
            map(
                (payloadResult : Appointement)=>new appsActions.UpdateAppointementsSuccess(payload)
            ), 
            tap((data) => {
                     console.log(data);
            }),
           catchError(err =>of(new appsActions.UpdateAppointementsFail(err))
        )
        )
    )); 
}
