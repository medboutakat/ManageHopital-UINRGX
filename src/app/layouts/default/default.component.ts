import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationError, NavigationEnd, NavigationStart } from '@angular/router';
import { SiteMap } from 'src/app/app-site-map';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  title: string="";

  constructor(private route: ActivatedRoute) {
  
    
  //   this.router.events.subscribe((event) => {
 
  //     if (event instanceof NavigationStart) {
  //       console.log("roout event",event.url)
  //       this.title=event.url;SiteMap.GetTitle(event.url);
  //     }

  //     if (event instanceof NavigationEnd) {
  //       console.log("roout event",event.url)
  //       this.title=event.url;SiteMap.GetTitle(event.url);
  //     }

  //     if (event instanceof NavigationError) {
  //         // Hide loading indicator
  //         console.log("roout event",event.url)
  //         this.title=event.url;SiteMap.GetTitle(event.url);
  //         // Present error to user
  //         console.log(event.error);
  //     }
  // });


  //  console.log( this.router.url)
      
};
  ngOnInit() { 
 
  }


  sideBarToggler($event) {
    this.sideBarOpen = !this.sideBarOpen; 
  }

}
