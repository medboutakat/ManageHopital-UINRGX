import { Actions, Effect, ofType } from '@ngrx/effects';
import { OperationService } from '../operation.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as appsActions from './operation.actions'
import { Operation } from '../operation';
import { map, mergeMap, catchError, tap } from "rxjs/operators";
import { Action } from '@ngrx/store';

@Injectable()
export class OpEffect {

    constructor
        (
            private service: OperationService,
            private actions$: Actions
        ) { }

    /******************************get All operations************************************** */
    @Effect()
    LoadOperations$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.LoadOperations>(
            appsActions.OperationActionTypes.LOAD_OPERATIONS
        ),
        mergeMap((actions: appsActions.LoadOperations) =>
            this.service.getAll().pipe(
                map((operations: Operation[]) =>
                    new appsActions.LoadOperationsSuccess(operations)
                ),
                catchError(err => of(new appsActions.LoadOperationsFailed(err)))
            )
        )
    )
    /*****************************Delete operation******************************************** */
    @Effect()
    DeleteOperation$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.DeleteOperation>(
            appsActions.OperationActionTypes.DELETE_OPERATIONS
        ),
        map((action: appsActions.DeleteOperation) => action.payload),
        mergeMap((id) =>
            this.service.delete(id).pipe(
                map(() =>
                    new appsActions.DeleteOperationSuccess(id)
                ),
                catchError(err => of(new appsActions.DeleteOperationFail(err)))
            )
        )
    )
    /***************************create operation***************************************************** */
    @Effect()
    createOperation$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.CreateOperation>(
            appsActions.OperationActionTypes.CREATE_OPERATIONS
        ),
        map((action: appsActions.CreateOperation) => action.payload),
        mergeMap((apps: Operation) =>
            this.service.add(apps).pipe(
                map(
                    (newApp: Operation) =>
                        new appsActions.CreateOperationSuccess(newApp)
                ),
                catchError(err => of(new appsActions.CreateOperationFail(err)))
            )
        )
    );
    /********************************update operation******************************************* */

    @Effect()
    UpdateOperation$: Observable<Action> = this.actions$.pipe(
        ofType<appsActions.UpdateOperation>(
            appsActions.OperationActionTypes.UPDATE_OPERATIONS
        ),
        map((Actions: appsActions.UpdateOperation) => Actions.payload),
        mergeMap((payload: Operation) =>
            this.service.update(payload).pipe(
                map(
                    (payloadResult: Operation) => new appsActions.UpdateOperationSuccess(payload)
                ),
                tap((data) => {
                    console.log(data);
                }),
                catchError(err => of(new appsActions.UpdateOperationFail(err))
                )
            )
        ));
}
