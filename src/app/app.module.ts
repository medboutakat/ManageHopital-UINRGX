import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { StoreModule } from './layouts/store/store.module'; 
 
import { DragDropModule} from '@angular/cdk/drag-drop' 

import { NavbarComponent } from './shared/components/navbar/navbar.component'; 
import { SelectComponent } from './select/select.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';  

import { ContactComponent } from './contacts/contact/contact.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { SigninComponent } from './Auth/signin/signin.component';  
import { SavePdfComponent } from './appointements/save-pdf/save-pdf.component';

import { MatDialogModule } from '@angular/material/dialog'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatModule } from './chat/chat.module' 
import { AngularMaterialModule } from './angular-material/angular-material.module';  

import { AppStoreModule } from './app-store.module'; 
import { AutoCompleteComponent } from './controls/select/autocomplete.component';
import { AuthService } from './Auth/auth.service'; 
import { AuthGuard } from './Auth/auth-guard'; 
import { OurTeamComponent } from './our-team/our-team.component';
import { AuthInterceptor, ErrorInterceptor, TokenInterceptor } from './app.interceptors'; 
import { UploadFileComponent } from './upload-file/upload-file/upload-file.component';  

 





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
