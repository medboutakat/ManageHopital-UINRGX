import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';

import {StoreRouterConnectingModule,routerReducer,RouterStateSerializer,} from "@ngrx/router-store";
import {StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HospitalCatEffect } from './HospitalCategorie/Store/Effect'; 
import { AppointementComponent } from './appointements/appointement/appointement.component';
import { HopitalComponent } from './hopitals/hopital/hopital.component';
import { HttpClientModule } from '@angular/common/http';
import { HospitalCatReducer } from './HospitalCategorie/Store/reducer';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home.component';
import { HospitalCatComponent } from './HospitalCategorie/hospital-cat/hospital-cat.component';
import { SelectComponent } from './select/select.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';

import { doctorReducer } from './doctors/doctor-store/doctor.reducer';
import { DoctorEffect } from './doctors/doctor-store/doctor.effect';
import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component';
import { ContactComponent } from './contacts/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent, 
    AppointementComponent,
    LoginComponent, 
    HopitalComponent,
    HomeComponent,
    NavbarComponent,
    HospitalCatComponent,
    SelectComponent, 
    DoctorComponent, DoctorEditComponent, ContactComponent, 
    // FooterComponent, 
    // HeaderComponent
  ],
  imports: [
    BrowserModule,
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    StoreModule.forRoot({}), 
    StoreModule.forRoot({router: routerReducer}), 
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([HospitalCatEffect]),      
    EffectsModule.forRoot([]), 
    StoreModule.forFeature("HospitalCat",HospitalCatReducer),        
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    //for doctor
    StoreModule.forFeature("doctors", doctorReducer),
    EffectsModule.forRoot([DoctorEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
