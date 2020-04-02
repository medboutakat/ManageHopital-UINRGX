import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as appsActions from '../store/operation.actions'

@Component({
  selector: 'app-delete-operation',
  templateUrl: './delete-operation.component.html',
  styleUrls: ['./delete-operation.component.scss']
})
export class DeleteOperationComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<any>, private dialogRef: MatDialogRef<DeleteOperationComponent>) { }

  ngOnInit() {
  }
  id
  delete() {
    this.id = this.data.id;
    this.store.dispatch(new appsActions.DeleteOperation(this.id));
    this.dialogRef.close();
    this._snackBar.open("operation done", "delete", {
      duration: 2000,
    });


  }
}
