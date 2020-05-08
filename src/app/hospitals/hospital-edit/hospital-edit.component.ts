import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_DIALOG_DATA } from '@angular/material';
import { HopitalComponent } from '../hopital/hopital.component';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Hospital } from '../hospital.model';
import { Contact } from '../../contacts/contact.model';
import * as ActionsFiles from '../../hospitals/store/Action'
import { City } from '../../cities/city';
import { ContactHelper } from '../../contacts/contact.helper';
import { environment } from 'src/environments/environment';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.scss',"../../app-edit.component.scss"]
})



export class HospitalEditComponent implements OnInit {
  fileToUpload=null;  
  imageUrl:string="/assets/img/";
  HospitalForm: FormGroup;
  listhopitalValues: any; 
 _currentObject: Hospital; 
  title:any; 

  listhopitalCatValues: unknown[];
  contactForm: FormGroup;

 _currentContactObject: Contact; 
 updatePuctureImage: FormGroup; 

  constructor(private _bottomSheetRef: MatBottomSheetRef<HopitalComponent>, private store: Store<any>,public hossrvice: HospitalService,  @Inject(MAT_DIALOG_DATA) data,private fb: FormBuilder,) {
    
    this.store.dispatch(new ActionsFile.Load());
    this.store.subscribe(data => {
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues)
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
      pictureProfilePath:[this._currentObject.pictureProfilePath,Validators.required],
      contactModel:this.contactForm
    });

    this.updatePuctureImage = this.fb.group({    
      CovePathForm: new FormControl(''),
      PictureProfilePathForm: new FormControl(''), 
    });

    
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
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

      console.log("Add")
      this.store.dispatch( new ActionsFiles.CreateHospital(newApp));
    }
    else{ 
      console.log("Update")
      this.store.dispatch(new ActionsFiles.UpdateHospital(newApp));
    }
    this.HospitalForm.reset(); 
  }


  updateImages(){
    
    var newApp = this.HospitalForm.value;
    this.store.dispatch(new ActionsFiles.UpdateHospital(newApp));
  }

  onFileSelectCover(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updatePuctureImage.get('CovePath').setValue(file); 
    }
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]; 
      this.updatePuctureImage.get('PictureProfilePath').setValue(file); 
    }
  }

  // IMG:string;
  // onFileSelectCover(event)
  // {
  //   this.fileToUpload = event.target.files[0];
  //   //show image preview here
  //   var reader = new FileReader();
  //   reader.onload =(event : any)=>{
  //     this.imageUrl =event.target.result.replace('data:image/jpeg;base64,','data:image/png;base64,')
  //     var ret = this.imageUrl.replace('data:image/png;base64,','');
  //     this.hossrvice.RepByDmm.pictureProfilePath = ret
  //     console.log("imageUrl : ",this.imageUrl)
  //     console.log("ret : ",ret)
  //   }
    
  //   reader.readAsDataURL(this.fileToUpload);
  //   console.log("file : ",reader) 
  // }
}
