import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'; 
import { Store, select } from '@ngrx/store';
import * as ActionsFile from 'src/app/productCategorie/Store/Action'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'; 
import { Contact } from 'src/app/contacts/contact.model';
import * as ActionsFiles from 'src/app/products/store/Action'
import { City } from 'src/app/cities/city';
import { ContactHelper } from 'src/app/contacts/contact.helper';
import { environment } from 'src/environments/environment';
import { Product } from '../product.Module';
import { ProductComponent } from '../product/product.component';
import { Observable } from 'rxjs';
import * as fromFileUploadState from  'src/app/productimages/store/state'
import * as fromFileUploadSelectors from 'src/app/productimages/store/selector'
import * as fromFileUploadActions from  'src/app/productimages/store/Action'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss',"../../app-edit.component.scss"],
  providers:[
  //   {
  //   provide: MatDialogRef,
  //   useValue: {
  //     close: (dialogResult: any) => { }
  //   }
  // }
]
})
export class ProductEditComponent implements OnInit {
  fileToUpload=null;  
  imageUrl:string="";
  MainForm: FormGroup;
  listhopitalValues: any; 
 _currentObject: Product; 
  title:any; 
  productCatValues: unknown[]; 
  updatePuctureImage: FormGroup; 
 completed$: Observable<boolean>;
 progress$: Observable<number>;
 error$: Observable<string>;
 isInProgress$: Observable<boolean>;
 isReady$: Observable<boolean>;
 hasFailed$: Observable<boolean>;
  constructor(private _dialog: MatDialog, private store: Store<any>,  @Inject(MAT_DIALOG_DATA) private data,private fb: FormBuilder,
  private store$: Store<fromFileUploadState.State>,private dialog: MatDialog,) {
    //Category works
    this.store.dispatch(new ActionsFile.Load());
 
    this.store.subscribe(data => {
      this.productCatValues = Object.values(data.ProductCat.entities)
      console.log("productCatValues : ", this.productCatValues)
    });

    this._currentObject=  data._currentObject;

    if(this._currentObject==null)
    this._currentObject=new Product(); 

    this.title=  data.title; 
  
    console.log("current Object: ", this._currentObject);
      
    this.reserve=this.reserve.bind(this);      
  }

  ngOnInit() {  

   this.MainForm = this.fb.group({
      id: [this._currentObject.id, Validators.required], 
      name: [this._currentObject.name, Validators.required],
      quantityPerUnit: [this._currentObject.quantityPerUnit , Validators.required],
      unitPrice: [this._currentObject.unitPrice , Validators.required],
      unitsInStock: [this._currentObject.unitsInStock, Validators.required],
      unitsOnOrder: [this._currentObject.unitsOnOrder, Validators.required],
      reorderLevel: [this._currentObject.reorderLevel, Validators.required],
      discontinued: [this._currentObject.discontinued, Validators.required],
      productCategoryId: [this._currentObject.productCategoryId, Validators.required],    
    });

    this.updatePuctureImage = this.fb.group({    
      CovePath: null,
      pictureProfilePath: null, 
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

  openLink(event: MouseEvent): void {
    this._dialog.closeAll();
    event.preventDefault();
  }

  getContact(contact) {
    console.log('Contact : ', contact);
  }

  reserve() {
    var newApp = <Product>this.MainForm.value

    if(newApp.id==environment.EmptyGuid){ 
      console.log("Add")
      console.log("you want to add this product=> ",newApp)
      this.store.dispatch( new ActionsFiles.Create(newApp));
    }
    else{ 
      console.log("Update")
      this.store.dispatch(new ActionsFiles.Update(newApp));
    }
    this.MainForm.reset();
    this._dialog.closeAll();
  }


  updateImages(){
    
    var newApp = this.updatePuctureImage.value;
    newApp.pictureProfilePath=this.IMG
  
    if(newApp.id!=environment.EmptyGuid){  
      this.store.dispatch( new fromFileUploadActions.UploadResetAction(newApp));
    } 
    this.updatePuctureImage.reset(); 
    this.dialog.closeAll();
  }

  // onFileSelectCover(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.updatePuctureImage.get('CovePath').setValue(file); 
  //   }
  // }
  // onFileSelect(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0]; 
  //     this.updatePuctureImage.get('PictureProfilePath').setValue(file); 
  //   }
  // }
  IMG:string;
  onFileSelectCover(event)
  {
    this.fileToUpload = event.target.files[0];
    //show image preview here
    var reader = new FileReader();
    reader.onload =(event : any)=>{
      this.imageUrl =event.target.result
      this.IMG=this.imageUrl
    } 
    reader.readAsDataURL(this.fileToUpload);
    console.log("file : ",reader) 
  }
  // onFileSelect(event)
  // {
  //   this.fileToUpload = event.target.files[0];
  //   //show image preview here
  //   var reader = new FileReader();
  //   reader.onload =(event : any)=>{
  //     this.imageUrl =event.target.result.replace('data:image/jpeg;base64,','data:image/png;base64,')
  //     var ret = this.imageUrl.replace('data:image/png;base64,','');
  //     this.IMG = ret
  //    console.log("ret",this.IMG)
  //   } 
  //   reader.readAsDataURL(this.fileToUpload);
  //   console.log("file : ",reader) 
  // }
}
