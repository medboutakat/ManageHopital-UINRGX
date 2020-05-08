import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  @Input() name: string;
  @Input() txt: string; 
  @Input() display: string;
  @Input() listObjects: any[];
  @Input() fcName: string;

  @Output() valueSelected = new EventEmitter();

  constructor() { 
    console.log("listObject select: ",this.listObjects);
  }
 
  onSelectValue(value){
    console.log("value",value)
    this.valueSelected.emit(value); 
  }



  myControl = new FormControl();
  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    
    console.log("listObject select: ",this.listObjects);
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
