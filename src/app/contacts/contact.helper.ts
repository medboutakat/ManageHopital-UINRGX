import { Injectable } from '@angular/core';
import { ICrudService } from '../icrud-service';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RootURLS } from '../root-urls';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactHelper {

  static getFormBuilder(fb: FormBuilder, contact: Contact) {

    return fb.group({
      id: new FormControl(contact.id),
      email: new FormControl(contact.email, Validators.email),
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
