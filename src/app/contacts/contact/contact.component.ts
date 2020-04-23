import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { Contact } from '../contact.model';
import { Store } from '@ngrx/store';
import * as citiesActions from 'src/app/cities/store/city.actions'
import * as contactActions from '../store/contact.actions'
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, ControlValueAccessor {
  fb: FormBuilder;
  showSave: boolean;
  cities



  val = "" // this is the updated value that the class accesses

  constructor(private store: Store<any>) {
    this.store.dispatch(new citiesActions.LoadCities());
    this.store.subscribe(res => {
      this.cities = res.cities.Cities
      console.log("city", this.cities)
    })
  }
  ngOnInit() {

  }

  @Input() ContactForm: FormGroup;
  
  onChange: any = () => { }
  onTouch: any = () => { }
  set value(val) {
    // this value is updated by programmatic changes 
    console.log("val", val)
    if (val !== undefined && this.val !== val) {
      this.val = val
      this.onChange(val)
      this.onTouch(val)
    }
  }
  writeValue(value: any): void {
    console.log("val", value)
    this.value = value
  }
  registerOnChange(fn: any): void {
    console.log("val", fn)
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;

  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }


}
