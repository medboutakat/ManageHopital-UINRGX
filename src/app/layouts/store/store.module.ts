import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component'; 
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service'; 
import { ProductStoreComponent } from 'src/app/product-store/product-store.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; 

@NgModule({
  declarations: [
    StoreComponent, 
    ProductStoreComponent
  ],
  entryComponents: [
    StoreComponent, 
    ProductStoreComponent
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
    AngularMaterialModule
  ],
  providers: [
    DashboardService
  ]
})
export class StoreModule { }
