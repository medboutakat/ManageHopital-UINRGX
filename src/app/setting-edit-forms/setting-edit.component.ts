import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
  styleUrls: ['./setting-edit.component.scss'],

})
export class SettingEditComponent implements ControlValueAccessor {

  @Input()  categoryForm: FormGroup;   
  @Input() reserveAction: any ; 

  onChange: any = () => {}
  onTouch: any = () => {}
  val= "" // this is the updated value that the class accesses

  constructor() {
    console.log("--->>>",this.categoryForm.value); 
   }
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

  
  reserve(){
    this.reserveAction();
  }

}
