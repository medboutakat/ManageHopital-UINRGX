import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/doctors/doctorCategorie/Store/Action'

@Component({
  selector: 'app-doctor-cat',
  templateUrl: './doctor-cat.component.html',
  styleUrls: ['./doctor-cat.component.scss']
})
export class DoctorCatComponent implements OnInit {

  listDoctorCat
  constructor(private store : Store<any>) { }

  ngOnInit() {
    this.store.dispatch( new ActionsFile.LoadDoctorCat());
  
    this.store.subscribe(data =>{
      this.listDoctorCat = Object.values(data.DoctorCat.entities)  
      console.log(" this.listDoctorCat=> ",this.listDoctorCat) 
    
    }
    )
  }
  
}
