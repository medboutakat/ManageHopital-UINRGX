import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() name: string;
  @Input() txt: string; 
  @Input() display: string;
  @Input() listObjects: any[];
   keys:any;

  constructor() { 
 
    this.keys = Object.keys(this.listObjects)

    console.log("listObject keys: ",this.keys);
  }

  ngOnInit() {

    console.log("listObject select: ",this.listObjects);
  }

}
