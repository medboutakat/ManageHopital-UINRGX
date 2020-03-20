import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actionApps from '../store/appointement.actions'
import * as fromReducer from '../store/appointement.reducer'

@Component({
  selector: 'app-appointement',
  templateUrl: './appointement.component.html',
  styleUrls: ['./appointement.component.css']
})
export class AppointementComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch(new actionApps.LoadAppointements());
    this.store.subscribe(data => {
      this.apps = data.appointements.appointements;
      console.log("state", this.apps)
    })

  }
  apps;
  ngOnInit() {
  }
}
