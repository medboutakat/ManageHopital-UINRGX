import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store';
import * as appsActions from '../store/appointement.actions'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<any>, private dialogRef: MatDialogRef<DialogComponent>) {
    console.log("objet", data)
  }
  id
  ngOnInit() {
  }
  delete() {
    this.id = this.data.id;
    this.store.dispatch(new appsActions.DeleteAppointement(this.id));
    this.dialogRef.close();
    this._snackBar.open("operation done", "delete", {
      duration: 2000,
    });


  }


}
