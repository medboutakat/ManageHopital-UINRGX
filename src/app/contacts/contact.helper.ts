import { Injectable } from '@angular/core';
import { ICrudService } from '../icrud-service';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RootURLS } from '../root-urls';
import { FormBuilder, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactHelper {

  constructor(private fb: FormBuilder) { 
  } 

  getFormBuilder(contact:Contact)
  {
   return this.fb.group({
      id: new FormControl(contact.id),
      email: new FormControl(contact.email),
      fax: new FormControl(contact.fax),
      phone1: new FormControl(contact.phone1),
      adress1: new FormControl(contact.phone2),
      cityId: new FormControl(contact.cityId),
      phone2: new FormControl(contact.phone2),
      adress2: new FormControl(contact.adress2),
      whatsApp: new FormControl(contact.whatsApp),
    }); 
  }
}
