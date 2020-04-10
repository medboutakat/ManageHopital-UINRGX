import { Actions, Effect, ofType } from '@ngrx/effects';
import { OperationService } from '../operation.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as appsActions from './category.actions'
import { OperationCategory } from '../operation-category';
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from '@ngrx/store';
import { OperationCatService } from '../operation-cat.service';

@Injectable()
export class OperationCatEffect {

    constructor
        (
            private service: OperationCatService,
            private actions$: Actions
        ) { }

    /******************************get All operationsCategory************************************** */
    @Effect()
    LoadOperationsCat$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.LoadOperationsCategory>(
            appsActions.OperationCategoyrActionTypes.LOAD_OPERATIONSCATEGORY
        ),
        mergeMap((actions: appsActions.LoadOperationsCategory) =>
            this.service.getAll().pipe(
                map((operations: OperationCategory[]) =>
                    new appsActions.LoadOperationsCategorySuccess(operations)
                ),
                catchError(err => of(new appsActions.LoadOperationsCategoryFailed(err)))
            )
        )
    )


}
