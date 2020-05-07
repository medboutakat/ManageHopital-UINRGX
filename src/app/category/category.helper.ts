import { Injectable } from '@angular/core';
import { ICrudService } from '../icrud-service'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RootURLS } from '../root-urls';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Store,Action } from '@ngrx/store';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CategoryHelper {

  static getFormBuilder(fb: FormBuilder, currentObject: any) {
    return fb.group({
      id: [currentObject.id],
      name: [currentObject.name],
      remark: [currentObject.remark],
    }); 
  }

  static getActionName(formData: any):string{  
      var actionName= formData['id']==environment.EmptyGuid? 'Create':"Update";   
      console.log("actionName",actionName)
      return actionName;
  } 

}
