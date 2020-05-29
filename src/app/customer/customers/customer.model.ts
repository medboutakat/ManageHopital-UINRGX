
import { GeneratedId } from '../generatedId';
import { Contact } from '../contacts/contact.model';

export class Customer extends GeneratedId {
    id: string;
    firstName: string;
    lastName: string;
    sexe: string;
    contactId: string;
    contactModel:Contact;
    customerCategoryId: string;
}