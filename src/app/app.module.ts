import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
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
import { SavePdfComponent } from './appointements/save-pdf/save-pdf.component'; 
import { AppstoreModule } from './appstore/appstore.module'; 


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

    // FooterComponent, 
    // HeaderComponent
  ],
  entryComponents: [DialogComponent,HospitalEditComponent, AddAppointementComponent, SavePdfComponent],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule, 
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    StoreModule.forFeature("HospitalCat", HospitalCatReducer),
    StoreModule.forFeature("DoctorCat", DoctorCatReducer),
    StoreModule.forRoot({ "appointements": AppointementReducer }),
    StoreModule.forFeature("hospitals", HospitalReducer), 
    StoreModule.forFeature("doctors", doctorReducer),
    AppstoreModule, 
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatTooltipModule,
    //for doctor

    EffectsModule.forRoot([DoctorEffect, HospitalCatEffect, DoctorCatEffect, AppointementEffect, HospitalEffect]), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
