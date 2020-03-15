import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { doctorReducer } from "./doctor-store/doctor.reducer";
import { DoctorEffect } from "./doctor-store/doctor.effect";

import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { DoctorComponent } from './doctor/doctor.component';

const doctorRoutes: Routes = [{ path: "", component: DoctorComponent }];

@NgModule({
  declarations: [
    DoctorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(doctorRoutes),
    StoreModule.forFeature("doctors", doctorReducer),
    EffectsModule.forFeature([DoctorEffect])
  ]
})
export class DoctorModule { }
