import { Component, OnInit, forwardRef } from '@angular/core';
import  *  as  data  from 'src/app/data.json';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> DetailsComponent),
    multi: true
  }]
})
export class DetailsComponent implements ControlValueAccessor {
  products: any = (data as any).default;
  total=0;
  show:boolean = false;
  productForm = new FormGroup({
    id:new FormControl(0),
    name:new FormControl(''),
    description:new FormControl(''),
    tax:new FormControl(''),
    price:new FormControl(''),
    quantity:new FormControl(''),
  })
  constructor() { }

  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    console.log('data : ',data);
  
    console.log('products : ',this.products);
  }

  calcul(){
    this.total = 10
  }

  showAdd(){
    this.show = !this.show;
  }

  addDetail(){
    console.log('new product : ',this.productForm.value)
      this.products.push(this.productForm.value)
    this.showAdd();
    console.log('data after : ',data);
    localStorage.setItem('data', JSON.stringify(this.products));
    console.log('data befor : ',data);
    console.log('products : ',this.products);
    this.productForm.reset();
  }

}
