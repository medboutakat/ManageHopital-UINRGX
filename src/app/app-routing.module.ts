import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { HopitalComponent } from './hospitals/hopital/hopital.component';
import { HomeComponent } from './home/home.component';
import { HospitalCatComponent } from './HospitalCategorie/hospital-cat/hospital-cat.component';
import { AppointementComponent } from './appointements/appointement/appointement.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component';
import { DoctorCatComponent } from './doctorCategorie/doctor-cat/doctor-cat.component';
import { OperationComponent } from './operations/operation/operation.component';
import { SigninComponent } from './Auth/signin/signin.component';
import { InvoiceEditComponent } from './invoices/invoice-edit/invoice-edit.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './chat/contact/contact.component'
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { MaterialComponent } from './material/material/material.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';
import { PaymentComponent } from './payment/payment/payment.component';
import { ProductCatComponent } from './productCategorie/product-cat/product-cat.component';
import { ProductComponent } from './products/product/product.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { AuthGuardService } from './Auth/auth-guard.service';



const routes: Routes = [

  {
    path: '',
    component: DefaultComponent,

    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: 'posts', component: PostsComponent, canActivate: [AuthGuardService] },
      { path: 'appointement', component: AppointementComponent, canActivate: [AuthGuardService] },
      { path: 'hospitals', component: HopitalComponent, canActivate: [AuthGuardService] },
      { path: 'doctors', component: DoctorComponent, canActivate: [AuthGuardService] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
      { path: 'dashboard', component: NavbarComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'hospitalcat', component: HospitalCatComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'productedit', component: ProductEditComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'doctorCategory', component: DoctorCatComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'productCategory', component: ProductCatComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'invoice', component: InvoiceEditComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'invoicewithId/:id', component: InvoiceEditComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'invoices', component: InvoiceComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'operation', component: OperationComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'material', component: MaterialComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'products', component: ProductComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'materialedit', component: MaterialEditComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'addDoctor', component: DoctorEditComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'payment', component: PaymentComponent, pathMatch: 'full', canActivate: [AuthGuardService] },

    ]

  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
