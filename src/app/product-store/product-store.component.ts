import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'; 
import * as ActionsFile from "src/app/ProductCategorie/Store/Action";
import { productCat } from '../ProductCategorie/productCat.Module';

@Component({
  selector: 'product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss']
})
export class ProductStoreComponent implements OnInit {
  navLinks
  listProducts: unknown[];
  constructor(private store: Store<any>) {
    this.store.dispatch(new ActionsFile.Load());

    this.store.subscribe((data) => {
    this.navLinks = Object.values(data.ProductCat.entities);      
    this.listProducts = Object.values(data.products.entities);
    }); 
 
   }


  ngOnInit() {
  }

}
