import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() name: string;
  // @Input() txt: string; 
  // @Input() display: string;
  @Input() listObjects: any[];

  @Output() valueSelected = new EventEmitter();
  

  constructor() { 
 
    console.log("listObject select: ",this.listObjects);
  }

  ngOnInit() { 
    console.log("listObject select: ",this.listObjects);
  }

  onSelectValue(value){
    console.log("value",value)
    this.valueSelected.emit(value);
    
  }
}
