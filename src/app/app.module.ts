import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './page-section/navbar/navbar.component';
import { NavbarSmallComponent } from './page-section/navbar-small/navbar-small.component';
import { HttpClientModule } from '@angular/common/http';
import { AppointementComponent } from './appointements/appointement/appointement.component';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login/login.component';
import { SidebarComponent } from './page-section/sidebar/sidebar.component';
import { HopitalComponent } from './hopitals/hopital/hopital.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { HospitalCatComponent } from './HospitalCategorie/hospital-cat/hospital-cat.component';
import { HospitalCatEffect } from './HospitalCategorie/Store/Effect';
import { HospitalCatReducer } from './HospitalCategorie/Store/reducer';
import { SelectComponent } from './select/select.component';

import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctors/doctor/doctor.component';

import { MaterialModule } from './material/material.module';
import { doctorReducer } from './doctors/doctor-store/doctor.reducer';
import { DoctorEffect } from './doctors/doctor-store/doctor.effect';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarSmallComponent,
    AppointementComponent,
    LoginComponent,
    SidebarComponent,
    HopitalComponent,
    HomeComponent,
    HospitalCatComponent,
    SelectComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature("HospitalCat",HospitalCatReducer),
    EffectsModule.forRoot([HospitalCatEffect]),
    //for doctor
    StoreModule.forRoot({}),
    StoreModule.forFeature("doctors", doctorReducer),
    EffectsModule.forRoot([DoctorEffect]),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }