import { Actions, Effect, ofType } from '@ngrx/effects';
import { ContactService } from '../contact.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as ContactActions from '../store/contact.actions'
import { Contact } from '../contact.model';
import { map, mergeMap, catchError } from "rxjs/operators";
import { Action } from '@ngrx/store';

@Injectable()
export class ContactsEffect {

    constructor
        (
            private locationServ: ContactService,
            private actions$: Actions
        ) { }
    /***************************create Contact***************************************************** */
    @Effect()
    createContact$: Observable<Action> = this.actions$.pipe(
        ofType<ContactActions.CreateContact>(
            ContactActions.ContactActionTypes.ADD_CONTACT
        ),
        map((action: ContactActions.CreateContact) => action.payload),
        mergeMap((apps: Contact) =>
            this.locationServ.add(apps).pipe(
                map(
                    (newApp: Contact) =>
                        new ContactActions.CreateContactSuccess(newApp)
                ),
                catchError(err => of(new ContactActions.CreateContactFail(err)))
            )
        )
    )
}