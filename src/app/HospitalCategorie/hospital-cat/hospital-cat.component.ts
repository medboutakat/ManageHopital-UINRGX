import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'

@Component({
  selector: 'app-hospital-cat',
  templateUrl: './hospital-cat.component.html',
  styleUrls: ['./hospital-cat.component.css']
})
export class HospitalCatComponent implements OnInit {
  listhopitalCat
  constructor(private store : Store<any>) { }

  ngOnInit() {
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
  
    this.store.subscribe(data =>{
      this.listhopitalCat = data.HospitalCat.HospitalCats
      // console.log(data.todos)
      console.log("list ; ",this.listhopitalCat)
    
    }
    )
    // console.log('list reponse',this.reponses$
  }

}
