import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_DIALOG_DATA } from '@angular/material'; 
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/productCategorie/Store/Action'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'; 
import { Contact } from 'src/app/contacts/contact.model';
import * as ActionsFiles from 'src/app/products/store/Action'
import { City } from 'src/app/cities/city';
import { ContactHelper } from 'src/app/contacts/contact.helper';
import { environment } from 'src/environments/environment';
import { ProductComponent } from '../product/product.component';
import { Product } from '../product.Module';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss',"../../app-edit.component.scss"]
})



export class ProductEditComponent implements OnInit {

  MainForm: FormGroup;
  listhopitalValues: any; 
 _currentObject: Product; 
  title:any; 

  listhopitalCatValues: unknown[]; 

 _currentContactObject: Contact; 
 updatePuctureImage: FormGroup; 

  constructor(private _bottomSheetRef: MatBottomSheetRef<ProductComponent>, private store: Store<any>,   @Inject(MAT_DIALOG_DATA) data,private fb: FormBuilder,) {
    
    this.store.dispatch(new ActionsFile.Load());
    this.store.subscribe(data => {
      this.listhopitalCatValues = Object.values(data.HospitalCat.entities)
      console.log(" this.listhopitalCatValues=> ", this.listhopitalCatValues)
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
      discontinued: [this._currentObject.discontinued, Validators.required], 
      productCategoryId: [this._currentObject.productCategoryId, Validators.required],    
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
    var newApp = <Product>this.MainForm.value     

    console.log("HospitalForm Valid",this.MainForm.valid)

    if(newApp.id==environment.EmptyGuid){ 

      console.log("Add")
      this.store.dispatch( new ActionsFiles.Create(newApp));
    }
    else{ 
      console.log("Update")
      this.store.dispatch(new ActionsFiles.Update(newApp));
    }
    this.MainForm.reset(); 
  }


  updateImages(){
    
    var newApp = this.MainForm.value;
    // this.store.dispatch(new ActionsFiles.UpdateHospitalPictures(newApp));
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
}
