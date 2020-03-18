import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ActionsFile from 'src/app/HospitalCategorie/Store/Action'
import { Observable } from 'rxjs';
import { HospitalCat } from 'src/app/HospitalCategorie/hospitalCat.model';

@Component({
  selector: 'app-hopital',
  templateUrl: './hopital.component.html',
  styleUrls: ['./hopital.component.css']
})
export class HopitalComponent implements OnInit {
  listhopitalCat: any;

  constructor(private store : Store<any>) {
    this.store.dispatch( new ActionsFile.LoadHospitalCat());
  
    this.store.subscribe(data =>{ 

      this.listhopitalCat =  data.HospitalCat.entities;

      console.log("list ; ",this.listhopitalCat)
    
    }
    )
  }
  ngOnInit() {
  }
  get hospitalcat(){
     return this.listhopitalCat;
  }
}
