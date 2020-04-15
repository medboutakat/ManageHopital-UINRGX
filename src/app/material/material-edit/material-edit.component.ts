import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ActionsFile from "src/app/material/Store/Action"; 
import { Material } from '../material-model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.scss']
})
export class MaterialEditComponent implements OnInit {
  form: FormGroup;

  // hero$:any;

  constructor(private store: Store<any>, private fb: FormBuilder, private route: ActivatedRoute,private router: Router) {

    // this.store.dispatch(new ActionsFile.LoadMaterial());
    // this.store.subscribe((data) => {
    //   this.materials = Object.values(data.Materials.entities); 
    //   this.dataSource = new MatTableDataSource<PeriodicElement>( this.materials);     
    //   console.log(" this.materials=> ",  this.materials );
    // });


   }

  ngOnInit() {
    this.form = this.fb.group({ 
      name: ["", Validators.required],
      remark: ["", Validators.required],
      quantity: [15, Validators.required], 
    });


    // this.hero$ = this.route.paramMap.pipe(
    //   // switchMap((params: ParamMap) =>

    //   //   // this.service.getHero(params.get('id')))
    //   );

  }


  add(){
    var a =this.form.value as Material;     
    console.log(a);
    this.store.dispatch(new ActionsFile.CreateMaterial(a)); 
  }

}
