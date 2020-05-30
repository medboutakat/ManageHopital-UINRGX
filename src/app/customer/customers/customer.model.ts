

import { GeneratedId } from 'src/app/generatedId';
import { Contact } from 'src/app/contacts/contact.model';

export class Customer extends GeneratedId {
    id: string;
    firstName: string;
    lastName: string;
    sexe: string;
    contactId: string;
    contactModel:Contact;
    customerCategoryId: string;
}