import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements ControlValueAccessor{
  
  @Input() IsRowSelected: boolean ;
  @Input() IsMultple: boolean ;  
  @Input() isNew: boolean ; 
  
  @Input() addAction: any ;
  @Input() editAction: any ;
  @Input() deleteAction: any ; 

  onChange: any = () => {}
  onTouch: any = () => {}

  val= "" // this is the updated value that the class accesses

  set value(val){ 
     // this value is updated by programmatic changes 
     console.log("val",val)
     if( val !== undefined && this.val !== val){
       this.val = val
       this.onChange(val)
       this.onTouch(val)
      }
  }
  // this method sets the value programmatically
  writeValue(value: any)
  { 
    console.log("val",value)
    this.value = value
  }
  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any){
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    console.log("val",fn)
    this.onChange = fn;
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
