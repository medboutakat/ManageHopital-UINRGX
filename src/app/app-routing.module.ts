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
<<<<<<< HEAD
import { AuthGuardService } from './Auth/auth-guard.service';
import { OurTeamComponent } from './our-team/our-team.component';
=======
import { AuthGuard } from './Auth/auth-guard';
>>>>>>> 14602dbd7c18705c6390e7e4a4e10897ffb9fb3b



const routes: Routes = [

  {
    path: '',
    component: DefaultComponent,

    children: [
<<<<<<< HEAD
      { path: '', component: DashboardComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'appointement', component: AppointementComponent },
      { path: 'hospitals', component: HopitalComponent , pathMatch: 'full'},
      { path: 'doctors', component: DoctorComponent },
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: NavbarComponent, pathMatch: 'full' },
      { path: 'hospitalcat', component: HospitalCatComponent, pathMatch: 'full' },      
      { path: 'productedit', component: ProductEditComponent, pathMatch: 'full' },
      { path: 'doctorCategory', component: DoctorCatComponent, pathMatch: 'full' },
      { path: 'productCategory', component: ProductCatComponent, pathMatch: 'full' },
      { path: 'invoice', component: InvoiceEditComponent, pathMatch: 'full' },
      { path: 'invoicewithId/:id', component: InvoiceEditComponent, pathMatch: 'full' },
      { path: 'invoices', component: InvoiceComponent, pathMatch: 'full' },
      { path: 'operation', component: OperationComponent, pathMatch: 'full' },
      { path: 'Category', component: CategoryComponent, pathMatch: 'full' },
      { path: 'chat', component: ContactComponent, pathMatch: 'full' },
      { path: 'material', component: MaterialComponent, pathMatch: 'full' }, 
      { path: 'products', component: ProductComponent, pathMatch: 'full' },
      { path: 'materialedit', component: MaterialEditComponent, pathMatch: 'full' },
      { path: 'addDoctor', component: DoctorEditComponent, pathMatch: 'full' }, 
      { path: 'payment', component: PaymentComponent, pathMatch: 'full' },
      {path : 'ourteam',component:OurTeamComponent, pathMatch:'full'},

=======
      { path: '', component: DashboardComponent  , canActivate: [AuthGuard]},
      { path: 'home', component: HomeComponent  , canActivate: [AuthGuard]},
      { path: 'posts', component: PostsComponent  , canActivate: [AuthGuard]},
      { path: 'appointement', component: AppointementComponent  , canActivate: [AuthGuard]},
      { path: 'hospitals', component: HopitalComponent , pathMatch: 'full' , canActivate: [AuthGuard]},
      { path: 'hospitalcat', component: HospitalCatComponent, pathMatch: 'full'  , canActivate: [AuthGuard]}, 
      { path: 'doctors', component: DoctorComponent  , canActivate: [AuthGuard]},
      { path: 'editdoctor', component: DoctorEditComponent, pathMatch: 'full'  , canActivate: [AuthGuard]}, 
      { path: 'doctorCategory', component: DoctorCatComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
      { path: 'dashboard', component: NavbarComponent, pathMatch: 'full' , canActivate: [AuthGuard] },    
      { path: 'products', component: ProductComponent, pathMatch: 'full'  , canActivate: [AuthGuard]}, 
      { path: 'productedit', component: ProductEditComponent, pathMatch: 'full'  , canActivate: [AuthGuard]},
      { path: 'productCategory', component: ProductCatComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
      { path: 'invoicewithId/:id', component: InvoiceEditComponent, pathMatch: 'full'  , canActivate: [AuthGuard]},
      { path: 'invoices', component: InvoiceComponent, pathMatch: 'full'  , canActivate: [AuthGuard]},
      { path: 'invoice', component: InvoiceEditComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
      { path: 'operation', component: OperationComponent, pathMatch: 'full'  , canActivate: [AuthGuard]},
      { path: 'Category', component: CategoryComponent, pathMatch: 'full'  , canActivate: [AuthGuard]},
      { path: 'material', component: MaterialComponent, pathMatch: 'full'  , canActivate: [AuthGuard]}, 
      { path: 'materialedit', component: MaterialEditComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
      { path: 'payment', component: PaymentComponent, pathMatch: 'full'  , canActivate: [AuthGuard]}, 
      { path: 'chat', component: ContactComponent, pathMatch: 'full'  , canActivate: [AuthGuard]},
>>>>>>> 14602dbd7c18705c6390e7e4a4e10897ffb9fb3b
    ]
   
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }, 

  // { path: 'material', loadChildren: () => import('./material/material/material.module').then(m => m.MaterialModule) } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
