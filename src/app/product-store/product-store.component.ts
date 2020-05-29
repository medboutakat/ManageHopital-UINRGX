import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'; 
import * as ActionsFileCats from "src/app/ProductCategorie/Store/Action";
import * as ActionsFileProducts from "src/app/products/Store/Action";
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
    this.store.dispatch(new ActionsFileCats.Load());
    this.store.dispatch(new ActionsFileProducts.Load());

    this.store.subscribe((data) => {
    this.navLinks = Object.values(data.ProductCat.entities);      
    this.listProducts = Object.values(data.products.entities);
    }); 
 
   }


  ngOnInit() {
  }

 
}
