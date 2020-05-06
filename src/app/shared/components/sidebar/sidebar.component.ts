import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user = localStorage.getItem("user");
  
	private activatedRoute: ActivatedRoute;
  constructor(activatedRoute: ActivatedRoute) { 

		this.activatedRoute = activatedRoute;
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
			( paramMap: ParamMap ) : void => {


           console.log("hello")
				// this.id = +paramMap.get( "id" );
				// this.mode = paramMap.get( "mode" );

			}
    );
    
  }
 
}
