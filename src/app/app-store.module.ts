import { NgModule } from '@angular/core'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects'; 
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HospitalCatReducer } from './HospitalCategorie/Store/reducer';
import { DoctorCatReducer } from './doctorCategorie/Store/reducer';
import { AppointementReducer } from './appointements/store/appointement.reducer';
import { HospitalReducer } from './hospitals/store/Reducer';
import { doctorReducer } from './doctors/doctor-store/doctor.reducer';
import { DoctorsEffect } from './doctors/doctor-store/doctor.effect';
import { HospitalCatEffect } from './HospitalCategorie/Store/Effect';
import { DoctorCatEffect } from './doctorCategorie/Store/Effect';
import { AppointementEffect } from './appointements/store/appointement.effect';
import { HospitalEffect } from './hospitals/store/Effect';
import { OperationReducer } from './operations/store/operations.reducer';
import { OperationCategoryReducer } from './operations/store/category.reducer';
import { OpEffect } from './operations/store/operation.effect';
import { InvoiceReducer } from './invoices/store/Reducer';
import { InvoiceEffect } from './invoices/store/Effect';
import { CityReducer } from './cities/store/city.reducer';
import { CityEffect } from './cities/store/city.effect'; 
import { ProductCatReducer } from './productCategorie/Store/reducer';
import { ProductReducer } from './products/store/Reducer';
import { OperationCatEffect } from './operations/store/category.effects';
import { ProductCatEffect } from './productCategorie/Store/Effect';
import { ProductEffect } from './products/store/Effect';


@NgModule({
  declarations: [],
  imports: [
    StoreDevtoolsModule.instrument(), 
    StoreModule.forRoot({}),
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }), 
    EffectsModule.forRoot([]), 

    // StoreModule.forRoot({"Hospital": HospitalReducer}),
    StoreModule.forFeature("HospitalCat", HospitalCatReducer),
    StoreModule.forFeature("Hospital", HospitalReducer),
    StoreModule.forFeature("DoctorCat", DoctorCatReducer),
    StoreModule.forFeature("ProductCat", ProductCatReducer),
    StoreModule.forFeature("doctors", doctorReducer),
    StoreModule.forFeature("appointements", AppointementReducer),
    StoreModule.forRoot({"invoices": InvoiceReducer }),
    StoreModule.forFeature("operations", OperationReducer),
    StoreModule.forFeature("operationsCat", OperationCategoryReducer),
    StoreModule.forFeature("cities", CityReducer),
    StoreModule.forFeature("products", ProductReducer),
    EffectsModule.forRoot([CityEffect, HospitalEffect, AppointementEffect, DoctorsEffect, HospitalCatEffect, DoctorCatEffect, OpEffect, AppointementEffect, InvoiceEffect, OperationCatEffect,ProductCatEffect,ProductEffect]),

  ]
})
export class AppStoreModule { }



/**
 *     StoreModule.forRoot({}),
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    EffectsModule.forRoot([]),
    // StoreModule.forRoot({"Hospital": HospitalReducer}),
    StoreModule.forFeature("HospitalCat", HospitalCatReducer),
    StoreModule.forFeature("Hospital", HospitalReducer),
    StoreModule.forFeature("DoctorCat", DoctorCatReducer),
    StoreModule.forFeature("ProductCat", ProductCatReducer),
    StoreModule.forFeature("doctors", doctorReducer),
    StoreModule.forFeature("appointements", AppointementReducer),
    StoreModule.forRoot({ "invoices": InvoiceReducer }),
    StoreModule.forFeature("operations", OperationReducer),
    StoreModule.forFeature("operationsCat", OperationCategoryReducer),
    StoreModule.forFeature("cities", CityReducer),
    EffectsModule.forRoot([CityEffect, HospitalEffect, AppointementEffect, DoctorsEffect, HospitalCatEffect, DoctorCatEffect, OpEffect, AppointementEffect, InvoiceEffect, OperationCatEffect, ProductCatEffect]),
    
 */