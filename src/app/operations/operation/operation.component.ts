import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddOperationComponent } from '../add-operation/add-operation.component';
import { Store } from '@ngrx/store';
import * as opp from '../store/operation.actions'
import { DeleteOperationComponent } from '../delete-operation/delete-operation.component';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  opp
  constructor(public dialog: MatDialog, private store: Store<any>) {
    this.store.dispatch(new opp.LoadOperations());
    this.store.subscribe(data => {
      this.opp = data.operations.operations;
      console.log("state operation", this.opp)
    })
  }

  ngOnInit() {
  }
  add() {
    this.dialog.open(AddOperationComponent);
  }
  delete(data) {
    this.dialog.open(DeleteOperationComponent, { data });
  }

}
