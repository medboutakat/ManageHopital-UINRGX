import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { HopitalComponent } from './hopitals/hopital/hopital.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home.component';
import { HospitalCatComponent } from './HospitalCategorie/hospital-cat/hospital-cat.component';
import { AppointementComponent } from './appointements/appointement/appointement.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
 
 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'appointement', component: AppointementComponent },
  { path: 'hospitals', component: HopitalComponent },
  { path: 'doctors', component: DoctorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: NavbarComponent, pathMatch: 'full' },
  { path : 'hospitalcat' , component:HospitalCatComponent , pathMatch:'full'}, 
  {
    path: '',
    component: DefaultComponent,
    children: [{
      path: '',
      component: DashboardComponent
    }, {
      path: 'posts',
      component: PostsComponent
    }]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
