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
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HospitalCatComponent } from './HospitalCategorie/hospital-cat/hospital-cat.component';
import { SelectComponent } from './select/select.component';
import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatBottomSheetModule, MatTooltipModule, MatCellDef } from '@angular/material'
import { DoctorCatComponent } from './doctors/doctorCategorie/doctor-cat/doctor-cat.component';
import { DialogComponent } from './appointements/dialog/dialog.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { CategoryComponent } from './category/category.component';
import { HospitalEditComponent } from './hospital/hospital-edit/hospital-edit.component';
import { SignupComponent } from './connexion/signup/signup.component';
import { SigninComponent } from './connexion/signin/signin.component';
import { AddAppointementComponent } from './appointements/add-appointement/add-appointement.component';
import { HospitalReducer } from './appointements/store/hospital.reducer';
import { HospitalEffect } from './appointements/store/hospital.effect';
import { OperationComponent } from './operations/operation/operation.component';
import { AddOperationComponent } from './operations/add-operation/add-operation.component';
import { DeleteOperationComponent } from './operations/delete-operation/delete-operation.component';
import { OperationReducer } from './operations/store/operations.reducer';
import { OpEffect } from './operations/store/operation.effect';
import { OperationCategoryReducer } from './operations/store/category.reducer';
import { OpCatEffect } from './operations/store/category.effects';

import { SavePdfComponent } from './appointements/save-pdf/save-pdf.component';
import { AppstoreModule } from './appstore/appstore.module';
import { HttpClientModule } from '@angular/common/http';
import { HospitalCatReducer } from './HospitalCategorie/Store/reducer';
import { DoctorCatReducer } from './doctors/doctorCategorie/Store/reducer';
import { doctorReducer } from './doctors/doctor-store/doctor.reducer';
import { DoctorEffect } from './doctors/doctor-store/doctor.effect';
import { DoctorCatEffect } from './doctors/doctorCategorie/Store/Effect';
import { AppointementEffect } from './appointements/store/appointement.effect';
import { AppointementReducer } from './appointements/store/appointement.reducer';




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
    AddAppointementComponent,
    SavePdfComponent,
    OperationComponent,
    AddOperationComponent,
    DeleteOperationComponent,
  ],

  entryComponents: [DialogComponent, AddAppointementComponent, SavePdfComponent, AddOperationComponent, DeleteOperationComponent, SavePdfComponent],


  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    AppstoreModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    StoreModule.forFeature("HospitalCat", HospitalCatReducer),
    StoreModule.forFeature("DoctorCat", DoctorCatReducer),
    StoreModule.forFeature("appointements", AppointementReducer),
    StoreModule.forFeature("hospitals", HospitalReducer),
    StoreModule.forFeature("operations", OperationReducer),
    StoreModule.forFeature("operationsCat", OperationCategoryReducer),
    StoreModule.forFeature("hospitals", HospitalReducer),
    StoreModule.forFeature("doctors", doctorReducer),

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatTooltipModule,
    //for doctor


    EffectsModule.forRoot([DoctorEffect, HospitalCatEffect, DoctorCatEffect, AppointementEffect, HospitalEffect, OpEffect, OpCatEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
