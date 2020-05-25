import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor(  private route: ActivatedRoute) { 

  }

  ngOnInit() { 

  //  let smapShout = this.route.snapshot;

  //   console.log("smapShout",smapShout)
  }


  sideBarToggler($event) {
    this.sideBarOpen = !this.sideBarOpen; 
  }

}
