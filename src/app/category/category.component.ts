import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HospitalCatComponent } from '../HospitalCategorie/hospital-cat/hospital-cat.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],

})
export class CategoryComponent implements ControlValueAccessor {
  @Input() IsRowSelected: boolean ;
  @Input() IsMultple: boolean ;  
  @Input() isNew: boolean ; 
  @Input() addAction: any ;
  @Input() editAction: any ;
  @Input() deleteAction: any ; 

 onChange: any = () => {}
 onTouch: any = () => {}
 val= "" // this is the updated value that the class accesses

  constructor() { }
  set value(val){ 
    // this value is updated by programmatic changes 
    console.log("val",val)
    if( val !== undefined && this.val !== val){
      this.val = val
      this.onChange(val)
      this.onTouch(val)
     }
 }
  writeValue(value: any): void {
    console.log("val",value)
    this.value = value
  }
  registerOnChange(fn: any): void {
    console.log("val",fn)
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;

  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  add(){
    this.addAction();
  }
  edit(){
    this.editAction();
  }
  delete(){
    this.deleteAction();
  }

}
