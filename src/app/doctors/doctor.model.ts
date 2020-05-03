
import { GeneratedId } from '../generatedId';
import { Contact } from '../contacts/contact.model';

export class Doctor extends GeneratedId {
    id: string;
    firstName: string;
    lastName: string;
    sexe: string;
    contactModel:Contact;
}