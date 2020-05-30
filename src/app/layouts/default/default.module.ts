 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { DoctorComponent } from 'src/app/doctors/doctor/doctor.component';
import { DoctorEditComponent } from 'src/app/doctors/doctor-edit/doctor-edit.component'; 
import { DoctorCatComponent } from 'src/app/doctorCategorie/doctor-cat/doctor-cat.component'; 
import { CategoryComponent } from 'src/app/category/category.component';
import { OperationComponent } from 'src/app/operations/operation/operation.component';
import { HospitalCatEditComponent } from 'src/app/HospitalCategorie/hospital-cat-edit/hospital-edit-cat.component';
import { AddOperationComponent } from 'src/app/operations/edit-operation/add-operation.component';
import { SettingEditComponent } from 'src/app/setting-edit-forms/setting-edit.component';
import { InvoiceEditComponent } from 'src/app/invoices/invoice-edit/invoice-edit.component';
import { ProductCatComponent } from 'src/app/productCategorie/product-cat/product-cat.component';
import { CustomerEditCatComponent } from 'src/app/customerCategorie/customer-edit-cat/customer-edit-cat.component';
import { ProductimageComponent } from 'src/app/productimages/productimage/productimage.component';
import { TaxEditComponent } from 'src/app/Tax/tax-edit/tax-edit.component';
import { TaxComponent } from 'src/app/Tax/tax/tax.component';
import { ProductComponent } from 'src/app/products/product/product.component';
import { MaterialEditComponent } from 'src/app/material/material-edit/material-edit.component';
import { MaterialComponent } from 'src/app/material/material/material.component';
import { ProductEditComponent } from 'src/app/products/product-edit/product-edit.component';
import { CustomerCatComponent } from 'src/app/customerCategorie/customer-cat/customer-cat.component';
import { ProductEditCatComponent } from 'src/app/productCategorie/product-edit-cat/product-edit-cat.component';
import { DoctorEditCatComponent } from 'src/app/doctorCategorie/doctor-edit-cat/doctor-edit-cat.component';
import { PaymentComponent } from 'src/app/payment/payment/payment.component';
import { AppointemntEditComponent } from 'src/app/appointements/appointemnt-edit/appointemnt-edit.component';
import { HospitalEditComponent } from 'src/app/hospitals/hospital-edit/hospital-edit.component';
import { InvoiceComponent } from 'src/app/invoices/invoice/invoice.component';
import { AppointementComponent } from 'src/app/appointements/appointement/appointement.component';
import { HospitalCatComponent } from 'src/app/HospitalCategorie/hospital-cat/hospital-cat.component';
import { HomeComponent } from 'src/app/home/home.component';
import { HopitalComponent } from 'src/app/hospitals/hopital/hopital.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; 
import { MenuComponent } from 'src/app/menu/menu.component';
import { CustomerComponent } from 'src/app/customer/customers/customer/customer.component';
import { CustomerEditComponent } from 'src/app/customer/customers/customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent, 
    DoctorComponent, 
    DoctorEditComponent,  
    DoctorCatComponent,  
    CategoryComponent,
    SettingEditComponent,
    InvoiceEditComponent, 
    OperationComponent,
    AddOperationComponent,
    AppointemntEditComponent,
    HospitalEditComponent,
    InvoiceComponent,
    HospitalCatEditComponent, 
    AppointementComponent,
    HospitalCatComponent,
    HopitalComponent,
    HomeComponent,
    MaterialComponent,
    MaterialEditComponent,
    DoctorEditCatComponent,
    PaymentComponent,
    ProductCatComponent,
    ProductEditCatComponent,
    ProductComponent,
    ProductEditComponent,
    TaxComponent,
    TaxEditComponent,
    ProductimageComponent,
    CustomerCatComponent ,
    CustomerEditCatComponent ,
    MenuComponent,
    CustomerComponent,
    CustomerEditComponent
  ],
  entryComponents: [
    HospitalEditComponent,
    AppointemntEditComponent,
    AddOperationComponent,
    HospitalCatEditComponent, 
    DoctorEditComponent,
    DoctorEditCatComponent, 
    TaxComponent,
    TaxEditComponent,
    PaymentComponent,
    ProductEditCatComponent,
    ProductEditComponent,
    CustomerEditCatComponent ,
    MenuComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    AngularMaterialModule,
  ],
  providers: [
    DashboardService    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DefaultModule { }
