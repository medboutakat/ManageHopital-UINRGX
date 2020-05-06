import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user = localStorage.getItem("user");
  
	private activatedRoute: ActivatedRoute;
  constructor(activatedRoute: ActivatedRoute,private titleService: Title) { 

		this.activatedRoute = activatedRoute;
  }



  links=[
    { path: '/', text: "Dashboard" }, 
    { path: '/appointement', text: "Appointements" }, 
    { path: '/Hospitals', text: "Hospitals" }, 
    { path: '/hospitalcat', text: "Hospital category" }, 
    { path: '/doctors', text: "Doctors" }, 
    { path: '/doctorCategory', text: "Doctor category" }, 
    { path: '/products', text: "Products" }, 
    { path: '/productCategory', text: "Product category" }, 
    { path: '/invoices', text: "Invoices" }, 
    { path: '/invoice', text: "Create invoice" }, 
    { path: '/operation', text: "Operations" }, 
    { path: '/material', text: "Materials" }, 
    { path: '/materialedit', text: "Create material" }, 
    { path: '/payment', text: "Payment" }
  ];

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() { 
  
    this.setTitle("Please set title");

    console.log(this.links)
    this.activatedRoute.params.subscribe(
			( paramMap: ParamMap ) : void => {


     
				// this.id = +paramMap.get( "id" );
				// this.mode = paramMap.get( "mode" );

			}
    ); 
  }
 
}
