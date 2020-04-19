import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as doctorsAction from '../doctor-store/doctor.action'

@Component({
  selector: 'delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.scss']
})
export class DeleteDoctorComponent implements OnInit {
  id
  constructor(private dialogRef: MatDialogRef<DeleteDoctorComponent>, private store: Store<any>) {
    this.id = localStorage.getItem("id")
    console.log("id doctor", this.id)
  }

  ngOnInit() {
  }
  delete(id) {
    this.store.dispatch(new doctorsAction.DeleteDoctor(id));
    this.store.subscribe(res => {
      console.log("delete bien faite")
    })
  }

}
