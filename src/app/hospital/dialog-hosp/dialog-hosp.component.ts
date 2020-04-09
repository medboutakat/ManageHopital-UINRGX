import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { DialogComponent } from 'src/app/appointements/dialog/dialog.component';
import * as ActionsFile from 'src/app/hospital/store/Action'


@Component({
  selector: 'app-dialog-hosp',
  templateUrl: './dialog-hosp.component.html',
  styleUrls: ['./dialog-hosp.component.scss']
})
export class DialogHospComponent implements OnInit {

 
  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<any>, private dialogRef: MatDialogRef<DialogComponent>) {
    console.log("objet", data)
  }
  id
  ngOnInit() {
  }
  delete() {
    this.id = this.data.id;
    this.store.dispatch(new ActionsFile.DeleteHospital(this.id));
    this.dialogRef.close();
    this._snackBar.open("operation done", "delete", {
      duration: 2000,
    });
  }

}
