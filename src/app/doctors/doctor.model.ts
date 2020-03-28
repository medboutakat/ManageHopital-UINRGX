import { Contact } from '../contacts/contact.model';

export class Doctor{
    id: string;
    firstName: string;
    lastName: string;
    sexe: string;
    contactId: number;
    contact:Contact;
    categoryId:number
}