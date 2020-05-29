import { Actions, Effect, ofType } from '@ngrx/effects';
import { CustomerService } from '../customer.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as customerActions from '../customer-store/action'
import { Customer } from '../customer.model';
import { map, mergeMap, catchError, tap } from "rxjs/operators";
import { Action } from '@ngrx/store';

@Injectable()
export class CustomersEffect {

    constructor
        (
            private locationServ: CustomerService,
            private actions$: Actions
        ) { }

    @Effect()
    loadCustomers: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.Load>(
            customerActions.CustomerActionType.LOAD
        ),
        mergeMap((actions: customerActions.Load) =>
            this.locationServ.getAll().pipe(
                map((locations: Customer[]) =>
                    new customerActions.LoadSuccess(locations)
                ),
                catchError(err => of(new customerActions.LoadFail(err)))
            )
        )
    )

    /*****************************Delete Customer******************************************** */
    @Effect()
    DeleteCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.Delete>(
            customerActions.CustomerActionType.DELETE
        ),
        map((action: customerActions.Delete) => action.payload),
        mergeMap((id) =>
            this.locationServ.delete(id).pipe(
                map(() =>
                    new customerActions.DeleteSuccess(id)
                ),
                catchError(err => of(new customerActions.DeleteFail(err)))
            )
        )
    )
    /***************************create Customer***************************************************** */
    @Effect()
    createDoctot$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.Create>(
            customerActions.CustomerActionType.CREATE
        ),
        map((action: customerActions.Create) => action.payload),
        mergeMap((apps: Customer) =>
            this.locationServ.add(apps).pipe(
                map(
                    (newApp: Customer) =>
                        new customerActions.CreateSuccess(newApp)
                ),
                catchError(err => of(new customerActions.CreateFail(err)))
            )
        )
    );
    /******************************update Customer*********************************************** */

    @Effect()
    UpdateCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.Update>(
            customerActions.CustomerActionType.UPDATE
        ),
        map((Actions: customerActions.Update) => Actions.payload),
        mergeMap((payload: Customer) =>
            this.locationServ.update(payload).pipe(
                map(
                    (payloadResult: Customer) => new customerActions.UpdateSuccess(payload)
                ),
                tap((data) => {
                    console.log(data);
                }),
                catchError(err => of(new customerActions.UpdateFail(err))
                )
            )
        ));

}