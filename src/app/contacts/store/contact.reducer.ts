import { createFeatureSelector, createSelector, State } from "@ngrx/store"
import { EntityAdapter, createEntityAdapter, EntityState, Update } from "@ngrx/entity"
import * as fromRoot from '../store/store';
import * as ContactActions from '../store/contact.actions';
import { Contact } from '../contact.model';

export interface contactState {
    contacts: Contact[],
    loadSeccess: boolean,
    getting: boolean,
    error: string
}

export interface AppState extends fromRoot.StoreInterface {
    contacts: contactState
}
export const ContactAdapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();
export const initialStates: contactState = {
    contacts: [],
    loadSeccess: false,
    getting: false,
    error: " "
}

export const initialState = ContactAdapter.getInitialState(initialStates);
//reducer
export function ContactReducer(state = initialState, action: ContactActions.CustomAction): contactState {
    switch (action.type) {

        /**********************************create Contact********************************************************************* */
        case ContactActions.ContactActionTypes.ADD_CONTACT_SUCCESS: {
            return ContactAdapter.addOne(action.payload, state);
        }
        case ContactActions.ContactActionTypes.ADD_CONTACT_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        default: {
            return state;
        }
    }
}



