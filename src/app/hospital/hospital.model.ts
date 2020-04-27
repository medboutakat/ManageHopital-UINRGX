import { Contact } from '../contacts/contact.model';
import { GeneratedId } from '../generatedId';

export class Hospital extends GeneratedId{
    countryHealthId: string;
    name: string;
    remark: string;
    history: string;
    hospitalCategoryId: string;
    categoryName: string;
    covePath :  string;
    pictureProfilePath : string;
    contactModel:Contact;
    
}

 