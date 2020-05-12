import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  links=[
    {txt:'Dashboard',url:'/'},
    {txt:'Appointements',color:"", class:"fa fa-calendar", url:'/appointement'},
    {txt:'Articles',color:"", class:"fa fa-heartbeat",url:'/articles'},
    {txt:'Hospital',color:"", class:"fa fa-heartbeat" ,url:'/hospitals'},
    {txt:'Hospital category',color:"", class:"fa fa-user" ,url:'/hospitalcat'},
    {txt:'DoctorCategory',color:"", class:"" ,url:'/doctorCategory'},
    {txt:'ProductCategory',color:"", class:"" ,url:'/productCategory'},
    {txt:'Doctors',color:"", class:"" ,url:'/doctors'},
    {txt:'Invoices',color:"", class:"" ,url:'/invoices'},
    {txt:'Invoice',color:"", class:"" ,url:'/invoice'},
    {txt:'Operations',color:"", class:"" ,url:'/operation'},
    {txt:'Product',color:"", class:"" ,url:'/product'},
    {txt:'material',color:"", class:"" ,url:'/material'},
    {txt:'material edit',color:"", class:"" ,url:'/materialedit'},
    {txt:'Payment',color:"", class:"" ,url:'/payment'},
  ]
 

  drop(event: CdkDragDrop<string[]>) {
    console.log("hello")
    moveItemInArray(this.links, event.previousIndex, event.currentIndex);
  }


}
