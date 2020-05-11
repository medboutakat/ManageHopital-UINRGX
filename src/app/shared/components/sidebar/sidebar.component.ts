import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

 class link{
  txt:string;
  url:string;

  get path(){
    return '/'+this.url;
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user = localStorage.getItem("user");


  links: link[];

  constructor(

  ) { 


    let menulinks = localStorage.getItem("links");
    if(menulinks==null){
     var defaultMenu = [
        {txt:'home',url:'home'},
        {txt:'Dashboard',url:''},
        {txt:'Appointements',url:'appointement'},
        {txt:'Articles',url:'articles'},
        {txt:'Hospital',url:'hospitals'},
        {txt:'Hospital category',url:'hospitalcat'},
        {txt:'DoctorCategory',url:'doctorCategory'},
        {txt:'ProductCategory',url:'productCategory'},
        {txt:'Doctors',url:'doctors'},
        {txt:'Invoices',url:'invoices'},
        {txt:'Invoice',url:'invoice'},
        {txt:'Operations',url:'operation'},
        {txt:'Product',url:'product'},
        {txt:'material',url:'material'},
        {txt:'material edit',url:'materialedit'},
        {txt:'Payment',url:'payment'},
      ]

      localStorage.setItem("links",JSON.stringify( defaultMenu));  
    }

  }

  ngOnInit() {
   
    let result=localStorage.getItem("links") 
    this.links= JSON.parse(result); 

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.links, event.previousIndex, event.currentIndex);
    localStorage.setItem("links",JSON.stringify( this.links)); 
  }

}
