import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { HopitalComponent } from './hospital/hopital/hopital.component';
import { HomeComponent } from './home/home.component';
import { HospitalCatComponent } from './HospitalCategorie/hospital-cat/hospital-cat.component';
import { AppointementComponent } from './appointements/appointement/appointement.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DoctorEditComponent } from './doctors/doctor-edit/doctor-edit.component';
import { DoctorCatComponent } from './doctors/doctorCategorie/doctor-cat/doctor-cat.component';
import { SignupComponent } from './connexion/signup/signup.component';
import { OperationComponent } from './operations/operation/operation.component';
import { SigninComponent } from './connexion/signin/signin.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './chat/contact/contact.component'
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { MaterialComponent } from './material/material/material.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';



const routes: Routes = [

  {
    path: '',
    component: DefaultComponent,

    children: [
      { path: '', component: DashboardComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'appointement', component: AppointementComponent },
      { path: 'hospitals', component: HopitalComponent },
      { path: 'doctors', component: DoctorComponent },
      { path: 'doctoredit', component: DoctorEditComponent },
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: NavbarComponent, pathMatch: 'full' },
      { path: 'hospitalcat', component: HospitalCatComponent, pathMatch: 'full' },
      { path: 'doctorCategory', component: DoctorCatComponent, pathMatch: 'full' },
      { path: 'invoice', component: InvoiceComponent, pathMatch: 'full' },
      { path: 'invoicewithId/:id', component: InvoiceComponent, pathMatch: 'full' },
      { path: 'invoices', component: InvoiceListComponent, pathMatch: 'full' },
      { path: 'operation', component: OperationComponent, pathMatch: 'full' },
      { path: 'Category', component: CategoryComponent, pathMatch: 'full' },
      { path: 'chat', component: ContactComponent, pathMatch: 'full' },
      { path: 'material', component: MaterialComponent, pathMatch: 'full' },
      { path: 'materialedit', component: MaterialEditComponent, pathMatch: 'full' },



    ]
  },
  { path: 'signin', component: SigninComponent },
  // { path: 'material', loadChildren: () => import('./material/material/material.module').then(m => m.MaterialModule) } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
