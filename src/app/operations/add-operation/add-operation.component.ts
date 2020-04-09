import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as opCat from '../store/category.actions'
import { OperationCategory } from '../operation-category';
import { FormBuilder, Validators } from '@angular/forms';
import { Operation } from '../operation';
import * as appsAction from '../store/operation.actions'

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent implements OnInit {
  oppCate: OperationCategory[];
  constructor(private store: Store<any>, private fb: FormBuilder) {
    this.store.dispatch(new opCat.LoadOperationsCategory());
    this.store.subscribe(data => {
      this.oppCate = data.operationsCat.operationsCategory;
      console.log("state operation Category", this.oppCate)
    })
  }
  addForm
  ngOnInit() {
    this.addForm = this.fb.group({
      'date': [null, [Validators.required]],
      'price': [null, Validators.required],
      'totalStayNight': [null, Validators.required],
      'operationCategoryId': [null, [Validators.required]],
    });
  }
  add() {
    var a = this.addForm.value as Operation
    this.store.dispatch(new appsAction.CreateOperation(a));
    this.addForm.reset();
    console.log("bien faite")
  }

}
