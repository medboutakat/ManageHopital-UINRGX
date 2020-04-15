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
import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule, MatTooltipModule, MatCellDef } from '@angular/material'
import { DoctorCatComponent } from './doctors/doctorCategorie/doctor-cat/doctor-cat.component';
import { DialogComponent } from './appointements/dialog/dialog.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { CategoryComponent } from './category/category.component';
import { HospitalEditComponent } from './hospital/hospital-edit/hospital-edit.component';
import { SignupComponent } from './connexion/signup/signup.component';
import { SigninComponent } from './connexion/signin/signin.component';
import { AppstoreModule } from './appstore/appstore.module';
import { AddAppointementComponent } from './appointements/add-appointement/add-appointement.component';
import { HospitalReducer } from './appointements/store/hospital.reducer';
import { HospitalsEffect } from './appointements/store/hospital.effect';
import { OperationComponent } from './operations/operation/operation.component';
import { AddOperationComponent } from './operations/add-operation/add-operation.component';
import { DeleteOperationComponent } from './operations/delete-operation/delete-operation.component';
import { OperationReducer } from './operations/store/operations.reducer';
import { OpEffect } from './operations/store/operation.effect';
import { OperationCategoryReducer } from './operations/store/category.reducer';
import { OperationCatEffect } from './operations/store/category.effects';

import { SavePdfComponent } from './appointements/save-pdf/save-pdf.component';

import { DialogHospComponent } from './hospital/dialog-hosp/dialog-hosp.component';
import { HospitalCatAddComponent } from './HospitalCategorie/hospital-cat-add/hospital-cat-add.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MenuComponent } from './menu/menu.component';

import { HttpClientModule } from '@angular/common/http';
import { HospitalCatReducer } from './HospitalCategorie/Store/reducer';
import { DoctorCatReducer } from './doctors/doctorCategorie/Store/reducer';
import { doctorReducer } from './doctors/doctor-store/doctor.reducer';
import { DoctorEffect } from './doctors/doctor-store/doctor.effect';
import { DoctorCatEffect } from './doctors/doctorCategorie/Store/Effect';
import { AppointementEffect } from './appointements/store/appointement.effect';
import { AppointementReducer } from './appointements/store/appointement.reducer';
import { ChatModule } from './chat/chat.module'
import { AgGridModule } from 'ag-grid-angular';
import { AngularMaterialModule } from './angular-material/angular-material.module';
// import { MaterialModule } from './material/material/material.module';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { DetailsComponent } from './invoices/details/details.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { AddDoctorCatComponent } from './doctors/doctorCategorie/add-doctor-cat/add-doctor-cat.component';
import { AddHospitalCatComponent } from './HospitalCategorie/add-hospital-cat/add-hospital-cat.component';
import { MaterialComponent } from './material/material/material.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';

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
    DoctorComponent, DoctorEditComponent, ContactComponent, DoctorCatComponent, DialogComponent,
    SelectComponent,
    DoctorComponent,
    SelectComponent,
    DoctorEditComponent,
    ContactComponent,
    DoctorCatComponent,
    CategoryComponent,
    ContactComponent,
    SigninComponent,
    SignupComponent,
    InvoiceComponent,
    DetailsComponent,
    OperationComponent,
    AddOperationComponent,
    AddAppointementComponent,
    SavePdfComponent,
    HospitalEditComponent,
    DialogHospComponent,
    HospitalCatAddComponent,
    DeleteOperationComponent,
    MenuComponent,
    SigninComponent,
    InvoiceListComponent,
    AddDoctorCatComponent,
    AddHospitalCatComponent,
    // StoreComponent 
    // FooterComponent, 
    // HeaderComponent
    MaterialComponent,
    MaterialEditComponent
  ],
  entryComponents: [
    DialogComponent,
    HospitalEditComponent,
    AddAppointementComponent,
    SavePdfComponent,
    DialogHospComponent,
    HospitalCatAddComponent,
    AddOperationComponent, DeleteOperationComponent,
    AddDoctorCatComponent,
    AddHospitalCatComponent,
    
  ],


  imports: [
    BrowserModule,
    AgGridModule.withComponents([DoctorCatComponent]),

    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,

    [MatDialogModule],
    AppstoreModule,

    AppstoreModule,
    HttpClientModule,

    // MaterialModule,

    StoreDevtoolsModule.instrument(),

    ChatModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatTooltipModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
