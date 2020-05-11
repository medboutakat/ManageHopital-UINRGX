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
import { HospitalService } from '../hospital.service';
import * as fromFileUploadState from  'src/app/hospitals/upload-file-store/state'
import * as fromFileUploadActions from  'src/app/hospitals/upload-file-store/Action'
import * as fromFileUploadSelectors from 'src/app/hospitals/upload-file-store/selector'
import { Observable } from 'rxjs';
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
 PuctureImage: FormGroup; 
 completed$: Observable<boolean>;
 progress$: Observable<number>;
 error$: Observable<string>;
 isInProgress$: Observable<boolean>;
 isReady$: Observable<boolean>;
 hasFailed$: Observable<boolean>;
  constructor( private dialog: MatDialog, private store: Store<any>,  @Inject(MAT_DIALOG_DATA) data,private fb: FormBuilder,
  private store$: Store<fromFileUploadState.State>) {
    
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
  console.log("contact",this._currentContactObject)
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


    this.completed$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileCompleted)
    );

    this.progress$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileProgress)
    );

    this.error$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileError)
    );

    this.isInProgress$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileInProgress)
    );

    this.isReady$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileReady)
    );

    this.hasFailed$ = this.store$.pipe(
      select(fromFileUploadSelectors.selectUploadFileFailed)
    );
  
  }

  getContact(contact) {
    console.log('Contact : ', contact);
  }

  reserve() {
    var newApp = <Hospital>this.HospitalForm.value    
    newApp.contactModel.cityId=+ newApp.contactModel.cityId;
 
    // newApp.pictureProfilePath=this.IMG
    // console.log("pictureProfilePath",newApp.pictureProfilePath)
    // newApp.covePath=this.IMG
    // console.log("covePath",newApp.covePath)

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
    this.dialog.closeAll();
  }


  updateImages(){
//  this.HospitalForm.get("pictureProfilePath")
//     var newApp = this.HospitalForm.value;
//     newApp.pictureProfilePath=this.IMG
//     console.log("hospImageeeee",newApp.pictureProfilePath)
//  this.HospitalForm.get("pictureProfilePath")

var newApp = this.PuctureImage.value;
    newApp.pictureProfilePath=this.IMG
    newApp.covePath=this.IMG
if(newApp.id!=environment.EmptyGuid){ 

  console.log("Add")
  this.store.dispatch( new fromFileUploadActions.UploadResetAction());
}
else{ 
  console.log("Update")
  this.store.dispatch(new fromFileUploadActions.UpdateHospital(newApp));
}
this.PuctureImage.reset(); 

  }

// uploadFile(event: any) {
//   const files: FileList = event.target.files;
//   const file = files.item(0);

//   this.store$.dispatch(
//     new fromFileUploadActions.UploadRequestAction({
//       file
//     })
//   );


//   event.srcElement.value = null;
// }
resetUpload() {
  this.store$.dispatch(new fromFileUploadActions.UploadResetAction());
}
// uploadFile(event) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       this.updatePuctureImage.get('CovePath').setValue(file); 
//     }
//   }
// uploadFile(event) {


//     if (event.target.files.length > 0) {
//       const file = event.target.files[0]; 
//       this.PuctureImage.get('PictureProfilePath').patchValue(file); 
//            var newApp = this.PuctureImage.value;
//         newApp.pictureProfilePath=this.IMG
//        console.log("hospImageeeee",newApp.pictureProfilePath)
//       this.HospitalForm.get("pictureProfilePath")
//     }
//   }
  
  IMG:string;
  onFileSelectCover(event)
  {
    this.fileToUpload = event.target.files[0];
    //show image preview here
    var reader = new FileReader();
    reader.onload =(event : any)=>{
      this.imageUrl =event.target.result.replace('data:image/jpeg;base64,','data:image/png;base64,')
      var ret = this.imageUrl.replace('data:image/png;base64,','');
      this.IMG = ret
      console.log("imageUrl : ",this.imageUrl)
      console.log("ret : ",this.IMG)
    } 
    reader.readAsDataURL(this.fileToUpload);
    console.log("file : ",reader) 
  }
  onFileSelect(event)
  {
    this.fileToUpload = event.target.files[0];
    //show image preview here
    var reader = new FileReader();
    reader.onload =(event : any)=>{
      this.imageUrl =event.target.result.replace('data:image/jpeg;base64,','data:image/png;base64,')
      var ret = this.imageUrl.replace('data:image/png;base64,','');
      this.IMG = ret
      console.log("imageUrl : ",this.imageUrl)
      console.log("ret : ",this.IMG)
    } 
    reader.readAsDataURL(this.fileToUpload);
    console.log("file : ",reader) 
  }
}
