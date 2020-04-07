import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material.component';
import { Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'material',
    component: MaterialComponent
  }
];
 


@NgModule({ 
  declarations: [MaterialComponent],
  imports: [
     
    CommonModule ,
    routes,
    // FormsModule,
    // ReactiveFormsModule,
    // AgGridModule.withComponents([]), 

  ],
  providers: [
    // VatService,
    // CustomerCategoryService,
    // CustomerCategoryResolverService
  ]
})



@NgModule({
  declarations: [MaterialComponent],
  imports: [
    CommonModule,
    routes,
  ]
})
export class MaterialModule { }
