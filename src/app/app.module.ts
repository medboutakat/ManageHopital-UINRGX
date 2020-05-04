import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer, } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HospitalCatEffect } from './HospitalCategorie/Store/Effect';
import { AppointementComponent } from './appointements/appointement/appointement.component';
import { HopitalComponent } from './hospital/hopital/hopital.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HospitalCatComponent } from './HospitalCategorie/hospital-cat/hospital-cat.component';
import { SelectComponent } from './select/select.component';

import { ContactComponent } from './contacts/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule, MatTooltipModule, MatCellDef } from '@angular/material'
import { DoctorCatComponent } from './doctorCategorie/doctor-cat/doctor-cat.component';

import { DoctorComponent } from './doctors/doctor/doctor.component';
import { CategoryComponent } from './category/category.component';
import { HospitalEditComponent } from './hospital/hospital-edit/hospital-edit.component';
import { SignupComponent } from './connexion/signup/signup.component';
import { SigninComponent } from './connexion/signin/signin.component'; 

import { OperationComponent } from './operations/operation/operation.component';
import { AddOperationComponent } from './operations/edit-operation/add-operation.component';

import { SavePdfComponent } from './appointements/save-pdf/save-pdf.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './menu/menu.component';

import { HttpClientModule } from '@angular/common/http';
import { ChatModule } from './chat/chat.module'
import { AgGridModule } from 'ag-grid-angular';
import { AngularMaterialModule } from './angular-material/angular-material.module';
// import { MaterialModule } from './material/material/material.module'; 
import { DetailsComponent } from './invoices/details/details.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { MaterialComponent } from './material/material/material.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';
import { AppointementReducer } from './appointements/store/appointement.reducer';
import { AppointementEffect } from './appointements/store/appointement.effect';

import { HospitalEffect } from './hospital/store/Effect';
import { HospitalReducer } from './hospital/store/Reducer';
import { HospitalCatReducer } from './HospitalCategorie/Store/reducer';
import { DoctorCatReducer } from './doctorCategorie/Store/reducer';
import { ProductCatReducer } from './productCategorie/Store/reducer';
import { doctorReducer } from './doctors/doctor-store/doctor.reducer';
import { InvoiceReducer } from './invoices/store/Reducer';
import { OperationCategoryReducer } from './operations/store/category.reducer';
import { OperationReducer } from './operations/store/operations.reducer';
import { DoctorsEffect } from './doctors/doctor-store/doctor.effect';
import { DoctorCatEffect } from './doctorCategorie/Store/Effect';
import { ProductCatEffect } from './productCategorie/Store/Effect';
import { OpEffect } from './operations/store/operation.effect';
import { HospitalCatEditComponent } from './HospitalCategorie/hospital-cat-edit/hospital-edit-cat.component';
import { InvoiceEffect } from './invoices/store/Effect';
import { DoctorEditCatComponent } from './doctorCategorie/doctor-edit-cat/doctor-edit-cat.component';
import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { InvoiceEditComponent } from './invoices/invoice-edit/invoice-edit.component';
import { CityReducer } from './cities/store/city.reducer';
import { CityEffect } from './cities/store/city.effect';
import { OperationCatEffect } from './operations/store/category.effects';
import { AppointemntEditComponent } from './appointements/appointemnt-edit/appointemnt-edit.component';
import { ProductCatComponent } from './productCategorie/product-cat/product-cat.component';
import { ProductEditCatComponent } from './productCategorie/product-edit-cat/product-edit-cat.component';
import { ProductEffect } from './products/store/Effect';
import { ProductReducer } from './products/store/Reducer';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductComponent } from './products/product/product.component';
import { AppStoreModule } from './app-store.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppointementComponent,
    HopitalComponent,
    HomeComponent,
    NavbarComponent,
    HospitalCatComponent,
    SignupComponent,
    SelectComponent,
    DoctorComponent, DoctorEditComponent, ContactComponent, DoctorCatComponent,
    SelectComponent,
    DoctorComponent,
    SelectComponent,
    ContactComponent,
    DoctorCatComponent,
    CategoryComponent,
    ContactComponent,
    SigninComponent,
    SignupComponent,
    InvoiceEditComponent,
    DetailsComponent,
    OperationComponent,
    AddOperationComponent,
    AppointemntEditComponent,
    SavePdfComponent,
    HospitalEditComponent,
    MenuComponent,
    SigninComponent,
    InvoiceComponent,
    HospitalCatEditComponent,
    MaterialComponent,
    MaterialEditComponent,


    DoctorEditCatComponent,
    PaymentComponent,


    ProductCatComponent,
    ProductEditCatComponent,
    ProductComponent, 
    ProductEditComponent 
  ],
  entryComponents: [

    HospitalEditComponent,
    AppointemntEditComponent,

    AddOperationComponent,
    HospitalCatEditComponent,

    MenuComponent,
    DoctorEditComponent,
    DoctorEditCatComponent,
    PaymentComponent,
    ProductEditCatComponent,    
    ProductEditComponent,
  ],


  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    AgGridModule.withComponents([DoctorCatComponent]), 
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule, 
    [MatDialogModule], 
    HttpClientModule, 
    ChatModule,
    AngularMaterialModule,
    MatBottomSheetModule,
    MatTooltipModule,
    HttpClientModule, 
    AppStoreModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
