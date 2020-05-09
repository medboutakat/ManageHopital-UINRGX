import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

 interface link{
  txt:string;
  url:string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user = localStorage.getItem("user");
  links: link[] = [
    {txt:'Dashboard',url:'/'},
    {txt:'Appointements',url:'/appointement'},
    {txt:'Articles',url:'/articles'},
    {txt:'Hospital',url:'/hospitals'},
    {txt:'Hospital category',url:'/hospitalcat'},
    {txt:'DoctorCategory',url:'/doctorCategory'},
    {txt:'ProductCategory',url:'/productCategory'},
    {txt:'Doctors',url:'/doctors'},
    {txt:'Invoices',url:'/invoices'},
    {txt:'Invoice',url:'/invoice'},
    {txt:'Operations',url:'/operation'},
    {txt:'Product',url:'/products'},
    {txt:'material',url:'/material'},
    {txt:'material edit',url:'/materialedit'},
    {txt:'Payment',url:'/payment'},
  ]
  constructor(

  ) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.links, event.previousIndex, event.currentIndex);
  }

}
