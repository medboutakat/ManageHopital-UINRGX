import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AppointementComponent } from './appointements/appointement/appointement.component';
import { SidebarComponent } from './page-section/sidebar/sidebar.component';
import { HopitalComponent } from './hopitals/hopital/hopital.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './page-section/navbar/navbar.component';
<<<<<<< HEAD
import { HospitalCatComponent } from './HospitalCategorie/hospital-cat/hospital-cat.component';

=======
import { DoctorComponent } from './doctors/doctor/doctor.component';
>>>>>>> b7f0baa1b3086e8343a7f92540728fdb4bb26eee


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'appointement', component: AppointementComponent },
  { path: 'hospitals', component: HopitalComponent },
  { path: 'doctors', component: DoctorComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: NavbarComponent, pathMatch: 'full' },
  { path : 'HospitalCategorie' , component:HospitalCatComponent , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
