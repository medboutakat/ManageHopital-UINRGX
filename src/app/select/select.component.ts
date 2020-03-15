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

  constructor() { }

  ngOnInit() {
  }

}
