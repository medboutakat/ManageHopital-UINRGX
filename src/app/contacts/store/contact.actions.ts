import { Action } from '@ngrx/store'
import { Contact } from '../contact.model'
import { CreateAppointementFail } from 'src/app/appointements/store/appointement.actions';

export enum ContactActionTypes {
    // add contact 
    ADD_CONTACT = "[Contact] add contact",
    ADD_CONTACT_SUCCESS = "[Contact] add contact success",
    ADD_CONTACT_FAIL = "[Contact] add contact fail"
}
export class CreateContact implements Action {
    readonly type = ContactActionTypes.ADD_CONTACT;
    constructor(public payload: Contact) { }
}
export class CreateContactSuccess implements Action {
    readonly type = ContactActionTypes.ADD_CONTACT_SUCCESS;

    constructor(public payload: Contact) { }
}

export class CreateContactFail implements Action {
    readonly type = ContactActionTypes.ADD_CONTACT_FAIL;

    constructor(public payload: string) { }
}
export type CustomAction =
    CreateContact
    | CreateContactSuccess
    | CreateContactFail
