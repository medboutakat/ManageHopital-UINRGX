import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { NavItem } from "../sidebar/nav-item.model";
import { SiteMap } from 'src/app/app-site-map';

class Link {
  txt: string;
  url: string;
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  user = localStorage.getItem("user");

  menu: NavItem[] ; 

  constructor() {



    // let menulinks = localStorage.getItem("links");
    let menulinks=null;
    if (menulinks == null) {

     let defaultMenu=  new SiteMap().menu;
      localStorage.setItem("links", JSON.stringify(defaultMenu));
    }
  }

  ngOnInit() {
    let result = localStorage.getItem("links");
    this.menu = JSON.parse(result);
  }

  dropMenu(event: CdkDragDrop<string[]>) {    
    moveItemInArray(this.menu, event.previousIndex, event.currentIndex);
    localStorage.setItem("links", JSON.stringify(this.menu));
  }

  dropChildren(event: CdkDragDrop<string[]>,item) {  
    var index=this.menu.indexOf(item); 
    moveItemInArray(this.menu[index].children, event.previousIndex, event.currentIndex);
    localStorage.setItem("links", JSON.stringify(this.menu));
  }
}
