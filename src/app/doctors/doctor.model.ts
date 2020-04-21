import { Contact } from '../contacts/contact.model';
import { GeneratedId } from '../generatedId';

export class Doctor extends GeneratedId {
    id: string;
    firstName: string;
    lastName: string;
    sexe: string;
    contactId: string;
    contact: Contact;
    categoryId: number;
}