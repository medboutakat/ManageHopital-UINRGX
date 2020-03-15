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

import {StoreRouterConnectingModule,routerReducer,RouterStateSerializer,} from "@ngrx/router-store";
import { MaterialModule } from './material/material.module';


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
    StoreModule.forRoot({
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature("HospitalCat",HospitalCatReducer),
    EffectsModule.forRoot([HospitalCatEffect]),
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }