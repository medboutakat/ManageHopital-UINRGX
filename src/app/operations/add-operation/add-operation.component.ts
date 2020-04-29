import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as opCat from '../store/category.actions'
import { OperationCategory } from '../operation-category';
import { FormBuilder, Validators } from '@angular/forms';
import { Operation } from '../operation';
import * as appsAction from '../store/operation.actions'
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent implements OnInit {

  constructor(private store: Store<any>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data) {
    this.store.dispatch(new opCat.LoadOperationsCategory());
    this.store.subscribe(data => {
      this.oppCate = data.operationsCat.operationsCategory;
      console.log("state operation Category", this.oppCate)
    })
    /*********************getting objet from operation************************ */
    this._currentObject = data._currentObject;
    this.title = data.title;
    console.log("current Object: ", this._currentObject);
  }
  /**************************les variables************************* */
  _currentObject: Operation;
  title: any;
  emptyGuid = "00000000-0000-0000-0000-000000000000";
  addForm
  oppCate: OperationCategory[];
  ngOnInit() {
    this.addForm = this.fb.group({
      'id': [this._currentObject.id, [Validators.required]],
      'date': [this._currentObject.date, [Validators.required]],
      'price': [this._currentObject.price, Validators.required],
      'totalStayNight': [this._currentObject.totalStayNight, Validators.required],
      'operationCategoryId': [this._currentObject.operationCategoryId, [Validators.required]],
    });
  }

  add() {

    var newApp = this.addForm.value as Operation
    if (newApp.id == "00000000-0000-0000-0000-000000000000") {
      console.log("Add")
      this.store.dispatch(new appsAction.CreateOperation(newApp));
    }
    else {
      console.log("Update")
      this.store.dispatch(new appsAction.UpdateOperation(newApp));
    }
    this.addForm.reset();
    console.log("success")

  }

}
