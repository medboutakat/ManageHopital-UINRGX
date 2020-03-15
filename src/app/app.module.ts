import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature("HospitalCat",HospitalCatReducer),
    EffectsModule.forRoot([HospitalCatEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
