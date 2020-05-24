import { FormGroup, FormBuilder } from '@angular/forms';
import { OnInit, Inject } from '@angular/core'; 
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { SettingEditHelper } from './setting-edit-base.helper';

 export class SettingEdiBaseComponent<T> implements OnInit{
   
    _categoryForm: FormGroup; 
    _currentObject: T; 
    _title : string;    
     
     
    constructor(protected fb: FormBuilder,
      protected store: Store, @Inject(MAT_DIALOG_DATA) data,
       protected dialog:MatDialog) {
                   
      this._currentObject=  data._currentObject;
      this._title=  data.title;
      console.log("current Object: ", this._currentObject);
     
    }
    ngOnInit() {
      this._categoryForm = SettingEditHelper.getFormBuilder(this.fb,this._currentObject);
    };

    getFormValue(){
     return this._categoryForm.value as T; 
    }


    getActionName(){
      var newApp = this.getFormValue();
      var actionName=SettingEditHelper.getActionName(newApp); 
      return actionName;
    }

    end(){
      this._categoryForm.reset();
      this.dialog.closeAll();
    } 
 }