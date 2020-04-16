import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HospitalCatReducer } from '../HospitalCategorie/Store/reducer';
import { DoctorCatReducer } from '../doctors/doctorCategorie/Store/reducer';
import { AppointementReducer } from '../appointements/store/appointement.reducer';
import { HospitalReducer } from '../hospital/store/Reducer';
import { doctorReducer } from '../doctors/doctor-store/doctor.reducer';
import { DoctorEffect } from '../doctors/doctor-store/doctor.effect';
import { HospitalCatEffect } from '../HospitalCategorie/Store/Effect';
import { DoctorCatEffect } from '../doctors/doctorCategorie/Store/Effect';
import { AppointementEffect } from '../appointements/store/appointement.effect';
import { HospitalEffect } from '../hospital/store/Effect';
import { OperationReducer } from '../operations/store/operations.reducer';
import { OperationCategoryReducer } from '../operations/store/category.reducer';
import { OpEffect } from '../operations/store/operation.effect';


@NgModule({
  declarations: [],
  imports: [ 
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    StoreModule.forFeature("HospitalCat", HospitalCatReducer),
    StoreModule.forFeature("DoctorCat", DoctorCatReducer),
    StoreModule.forRoot({ "Hospital": HospitalReducer }),
    StoreModule.forFeature("doctors", doctorReducer),

    StoreModule.forFeature("operations", OperationReducer),
    StoreModule.forFeature("operationsCat", OperationCategoryReducer),
    EffectsModule.forRoot([DoctorEffect, HospitalCatEffect, DoctorCatEffect, AppointementEffect,HospitalEffect,OpEffect]),
    CommonModule


  ]
})
export class AppstoreModule { }
