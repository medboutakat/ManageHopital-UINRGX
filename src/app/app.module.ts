import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module'; 
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
import { SignupComponent } from './Auth/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component'; 

import { OperationComponent } from './operations/operation/operation.component';
import { AddOperationComponent } from './operations/edit-operation/add-operation.component';

import { SavePdfComponent } from './appointements/save-pdf/save-pdf.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './menu/menu.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatModule } from './chat/chat.module'
import { AgGridModule } from 'ag-grid-angular';
import { AngularMaterialModule } from './angular-material/angular-material.module'; 
import { DetailsComponent } from './invoices/details/details.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { MaterialComponent } from './material/material/material.component'; 
import { MaterialEditComponent } from './material/material-edit/material-edit.component';   
import { HospitalCatEditComponent } from './HospitalCategorie/hospital-cat-edit/hospital-edit-cat.component'; 
 
import { DoctorEditCatComponent } from './doctorCategorie/doctor-edit-cat/doctor-edit-cat.component';
import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { InvoiceEditComponent } from './invoices/invoice-edit/invoice-edit.component'; 
import { AppointemntEditComponent } from './appointements/appointemnt-edit/appointemnt-edit.component';
import { ProductCatComponent } from './productCategorie/product-cat/product-cat.component';
import { ProductEditCatComponent } from './productCategorie/product-edit-cat/product-edit-cat.component'; 
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductComponent } from './products/product/product.component';
import { AppStoreModule } from './app-store.module';
import { AuthInterceptor } from './Auth/auth.interceptor';

const config = {
  issuer: 'https://okta.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '{clientId}'
};


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
  providers: [
    // SugarLevelService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
