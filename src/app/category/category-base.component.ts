import { FormGroup, FormBuilder } from '@angular/forms';
import { OnInit, Inject } from '@angular/core';
import { CategoryHelper } from './category.helper';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

 export class CategoryBaseComponent<T> implements OnInit{
   
    _categoryForm: FormGroup; 
    _currentObject: T; 
    _title : string;    
     
     
    constructor(private fb: FormBuilder,
      private store: Store,
       @Inject(MAT_DIALOG_DATA) data,
       private dialog:MatDialog) {
                   
      this._currentObject=  data._currentObject;
      this._title=  data.title;
      console.log("current Object: ", this._currentObject);
     
    }
    ngOnInit() {
      this._categoryForm = CategoryHelper.getFormBuilder(this.fb,this._currentObject);
    };
    
    end(){
      this._categoryForm.reset();
      this.dialog.closeAll();
    } 
 }