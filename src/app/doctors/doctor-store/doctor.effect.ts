import { Actions, Effect, ofType } from '@ngrx/effects';
import { DoctorService } from '../doctor.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as doctorActions from '../doctor-store/doctor.action'
import { Doctor } from '../doctor.model';
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from '@ngrx/store';

@Injectable()
export class DoctorEffect {
  constructor(
    private actions$: Actions,
    private doctorService: DoctorService
  ) {}

  @Effect()
  getDoctors$: Observable<Action> = this.actions$.pipe(
    ofType<doctorActions.getDoctor>(
      doctorActions.DoctorActionTypes.GET_DOCTORS
    ),
    mergeMap((action: doctorActions.getDoctor) =>
      this.doctorService.getDoctors().pipe(
        map(
          (doctors: Doctor[]) =>
            new doctorActions.getDoctorSeccess(doctors)
        ),
        catchError(err => of(new doctorActions.getDoctorFail(err)))
      )
    )
  );

  @Effect()
  getDoctor$: Observable<Action> = this.actions$.pipe(
    ofType<doctorActions.getOneDoctor>(
      doctorActions.DoctorActionTypes.GET_DOCTOR
    ),
    mergeMap((action: doctorActions.getOneDoctor) =>
      this.doctorService.getDoctorById(action.payload).pipe(
        map(
          (doctor: Doctor) =>
            new doctorActions.getOneDoctorSeccess(doctor)
        ),
        catchError(err => of(new doctorActions.getOneDoctorFail(err)))
      )
    )
  );

}