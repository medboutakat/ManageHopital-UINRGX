import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HopitalComponent } from '../hopital/hopital.component';
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Hospital } from '../hospital.model';
import { Contact } from '../../contacts/contact.model';
import * as ActionsFiles from '../../hospitals/store/Action'
import { City } from '../../cities/city';
import { ContactHelper } from '../../contacts/contact.helper';
import { environment } from 'src/environments/environment'; 
import * as fromFileUploadState from  'src/app/upload-file/store/state'
import * as fromFileUploadActions from  'src/app/upload-file/store/Action'
import * as fromFileUploadSelectors from 'src/app/upload-file/store/selector'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.scss',"../../app-edit.component.scss"]
})



export class HospitalEditComponent implements OnInit {
  fileToUpload=null;  
  imageUrl:string="";
  HospitalForm: FormGroup;
  listhopitalValues: any; 
 _currentObject: Hospital; 
  title:any; 

  _listCatetory: unknown[];
  contactForm: FormGroup;

 _currentContactObject: Contact; 
 PuctureImage: FormGroup; 
 
  constructor( private dialog: MatDialog, private store: Store<any>,  @Inject(MAT_DIALOG_DATA) data,private fb: FormBuilder ) {
    
    this.store.dispatch(new ActionsFile.Load());
    this.store.subscribe(data => {
      this._listCatetory = Object.values(data.HospitalCat.entities)
      console.log(" this._listCatehory=> ", this._listCatetory)
    });

    this._currentObject=  data._currentObject;

    if(this._currentObject==null)
    this._currentObject=new Hospital();
    
    this._currentContactObject=this._currentObject.contactModel==null?new Contact(): this._currentContactObject;

    this.title=  data.title; 
  
    console.log("current Object: ", this._currentObject);
      
    this.reserve=this.reserve.bind(this);      
  }

  ngOnInit() { 
 
    this.contactForm =  ContactHelper.getFormBuilder(this.fb, this._currentContactObject);
        
    this.HospitalForm = this.fb.group({
      id: [this._currentObject.id, Validators.required],
      countryHealthId:  [this._currentObject.countryHealthId, Validators.required],
      name: [this._currentObject.name, Validators.required],
      remark: [this._currentObject.remark, Validators.required],
      history: [this._currentObject.history, Validators.required],
      hospitalCategoryId: [this._currentObject.hospitalCategoryId, Validators.required],
      categoryName:  [this._currentObject.categoryName, Validators.required],  
      contactModel:this.contactForm
    });

    this.PuctureImage = this.fb.group({    
      pictureProfilePath: null,   
      covePath : null,
    });
 
  }

  getContact(contact) {
    console.log('Contact : ', contact);
  }

  reserve() {
    var newApp = <Hospital>this.HospitalForm.value   

      newApp.contactModel.cityId=+ newApp.contactModel.cityId;
      console.log("HospitalForm Valid",this.HospitalForm.valid)
      console.log("contactModel Valid",this.contactForm.valid)

    if(newApp.id==environment.EmptyGuid){   
      this.store.dispatch( new ActionsFiles.CreateHospital(newApp));
    }
    else{ 
      
      this.store.dispatch(new ActionsFiles.UpdateHospital(newApp));
    }
    this.HospitalForm.reset(); 
  } 

}
