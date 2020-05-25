import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { StoreModule } from './layouts/store/store.module'; 
 
import { DragDropModule} from '@angular/cdk/drag-drop' 

import { NavbarComponent } from './shared/components/navbar/navbar.component'; 
import { SelectComponent } from './select/select.component';

import { ContactComponent } from './contacts/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component'; 
import { DoctorEditCatComponent } from './doctorCategorie/doctor-edit-cat/doctor-edit-cat.component'; 
import { HospitalEditComponent } from './hospitals/hospital-edit/hospital-edit.component'; 

import { SignupComponent } from './Auth/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';
 
import { AddOperationComponent } from './operations/edit-operation/add-operation.component';

import { SavePdfComponent } from './appointements/save-pdf/save-pdf.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './menu/menu.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatModule } from './chat/chat.module' 
import { AngularMaterialModule } from './angular-material/angular-material.module';  
import { HospitalCatEditComponent } from './HospitalCategorie/hospital-cat-edit/hospital-edit-cat.component';

import { PaymentComponent } from './payment/payment/payment.component'; 
import { AppointemntEditComponent } from './appointements/appointemnt-edit/appointemnt-edit.component'; 
import { ProductEditComponent } from './products/product-edit/product-edit.component'; 
import { AppStoreModule } from './app-store.module'; 
import { ProductEditCatComponent } from './productCategorie/product-edit-cat/product-edit-cat.component';
import { AutoCompleteComponent } from './controls/select/autocomplete.component';
import { AuthService } from './Auth/auth.service'; 
import { AuthGuard } from './Auth/auth-guard'; 
import { OurTeamComponent } from './our-team/our-team.component';
import { AuthInterceptor, ErrorInterceptor, TokenInterceptor } from './app.interceptors'; 
import { UploadFileComponent } from './upload-file/upload-file/upload-file.component';  
import { TaxComponent } from './Tax/tax/tax.component';
import { TaxEditComponent } from './Tax/tax-edit/tax-edit.component';  
import { CustomerEditCatComponent } from './customerCategorie/customer-edit-cat/customer-edit-cat.component'; 
import { CustomerCatComponent } from './customerCategorie/customer-cat/customer-cat.component';

 

const config = {
  issuer: 'https://okta.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '{clientId}'
};




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarComponent,
    SignupComponent, 
    ContactComponent,
    SelectComponent,
    ContactComponent,
    SigninComponent,
    SignupComponent,
    SavePdfComponent,
    MenuComponent,
    SigninComponent,
    OurTeamComponent,
    AutoCompleteComponent,
    UploadFileComponent,  
  ],
  entryComponents: [
    // HospitalEditComponent,
    // AppointemntEditComponent,
    // AddOperationComponent,
    // HospitalCatEditComponent,
    // DoctorEditComponent,
    // DoctorEditCatComponent, 
    // TaxComponent,
    // TaxEditComponent,
    // PaymentComponent,
    // ProductEditCatComponent,
    // ProductEditComponent,
    // CustomerCatComponent ,
    // CustomerEditCatComponent ,
    MenuComponent,
    UploadFileComponent, 
  ],


  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // AgGridModule.withComponents([DoctorCatComponent]),
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    StoreModule,
    [MatDialogModule],
    HttpClientModule,
    ChatModule,
    AngularMaterialModule, 
    HttpClientModule,
    AppStoreModule,
    DragDropModule
  ],
  providers: [
     AuthService,
   
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    

  ],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],

})

export class AppModule {

}
