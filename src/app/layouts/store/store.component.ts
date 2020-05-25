

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit() { }


  // sideBarToggler($event) {
  //   this.sideBarOpen = !this.sideBarOpen;
  // }

}
