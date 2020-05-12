import { Contact } from '../contacts/contact.model';
import { GeneratedId } from '../generatedId';

export class Register extends GeneratedId { 
    firstName: string;
    lastName: string;
    sexe: string;
    username: string;
    password: string;
    userType: string;
    contactModel: Contact;
}
