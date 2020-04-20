import { Actions, Effect, ofType } from '@ngrx/effects';
import { CityService } from '../city.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as appsActions from './city.actions'
import { City } from '../city';
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from '@ngrx/store';

@Injectable()
export class CityEffect {

    constructor
        (
            private service: CityService,
            private actions$: Actions
        ) { }

    /******************************get All Cities************************************** */
    @Effect()
    LoadCities$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.LoadCities>(
            appsActions.CitiesActionTypes.LOAD_CITIES
        ),
        mergeMap((actions: appsActions.LoadCities) =>
            this.service.getAll().pipe(
                map((cities: City[]) =>
                    new appsActions.LoadCitiesSuccess(cities)
                ),
                catchError(err => of(new appsActions.LoadCitiesFailed(err)))
            )
        )
    )


}
