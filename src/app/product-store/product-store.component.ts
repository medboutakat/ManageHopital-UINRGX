import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as ActionsFileCats from "src/app/ProductCategorie/Store/Action";
import * as ActionsFileProducts from "src/app/products/Store/Action";
import { productCat } from '../ProductCategorie/productCat.Module';
import { ProductService } from '../products/Product.service';
import * as selectors from '../products/store/Reducer'
import { getcurrentProduct } from '../products/store/Reducer';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products/product.Module';



@Component({
  selector: 'product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss']
})
export class ProductStoreComponent implements OnInit {
  navLinks
  listProducts: Product[]
  list2: unknown

  constructor(private store: Store<any>, private service: ProductService, private route: ActivatedRoute) {
    var idd = this.route.snapshot.paramMap.get('id');
    if (idd != null) {
      console.log("idd", idd)
      this.store.dispatch(new ActionsFileProducts.LoadOneByCategory('category/' + idd))
      this.store.subscribe((data) => {
        this.listProducts = Object.values(data.products.entities);
        this.list2 = this.listProducts[0]
      });
    } else {
      this.store.dispatch(new ActionsFileProducts.Load())
      this.store.subscribe((data) => {
        this.list2 = Object.values(data.products.entities)
        console.log("all objets", this.list2)
      })
    }
    this.store.dispatch(new ActionsFileCats.Load());
    this.store.subscribe((data) => {
      this.navLinks = Object.values(data.ProductCat.entities);
    });
  }
  ngOnInit() {
  }




}
