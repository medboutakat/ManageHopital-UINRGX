import { Actions, Effect, ofType } from '@ngrx/effects';
import { DoctorService } from '../doctor.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as doctorActions from '../doctor-store/doctor.action'
import { Doctor } from '../doctor.model';
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from '@ngrx/store';

@Injectable()
export class DoctorsEffect {

    constructor
        (
            private locationServ: DoctorService,
            private actions$: Actions
        ) { }

    @Effect()
    loadDoctors: Observable<Action> = this.actions$.pipe(
        ofType<doctorActions.getDoctor>(
            doctorActions.DoctorActionTypes.GET_DOCTORS
        ),
        mergeMap((actions: doctorActions.getDoctor) =>
            this.locationServ.getAll().pipe(
                map((locations: Doctor[]) =>
                    new doctorActions.getDoctorSeccess(locations)
                ),
                catchError(err => of(new doctorActions.getDoctorFail(err)))
            )
        )
    )

    /*****************************Delete Doctor******************************************** */
    @Effect()
    DeleteDoctor$: Observable<Action> = this.actions$.pipe(
        ofType<doctorActions.DeleteDoctor>(
            doctorActions.DoctorActionTypes.DELETE_DOCTOR
        ),
        map((action: doctorActions.DeleteDoctor) => action.payload),
        mergeMap((id) =>
            this.locationServ.delete(id).pipe(
                map(() =>
                    new doctorActions.DeleteDoctorSuccess(id)
                ),
                catchError(err => of(new doctorActions.DeleteDoctorFail(err)))
            )
        )
    )
    /***************************create Doctor***************************************************** */
    @Effect()
    createDoctot$: Observable<Action> = this.actions$.pipe(
        ofType<doctorActions.CreateDoctor>(
            doctorActions.DoctorActionTypes.ADD_DOCTOR
        ),
        map((action: doctorActions.CreateDoctor) => action.payload),
        mergeMap((apps: Doctor) =>
            this.locationServ.add(apps).pipe(
                map(
                    (newApp: Doctor) =>
                        new doctorActions.CreateDoctorSuccess(newApp)
                ),
                catchError(err => of(new doctorActions.CreateDoctorFail(err)))
            )
        )
    );

}