import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/Material/store/Action'
import { MaterialService } from '../material.service';
import { Material } from '../material-model';
import { Router } from '@angular/router';

@Injectable()
export class MaterialEffect {
    constructor(private actions$ : Actions,
        private service : MaterialService, private router: Router)
   {
   }

  @Effect()
  LoadMaterial$: Observable<Action> = this.actions$.pipe(
      ofType<ActionsFile.LoadMaterial>(
          ActionsFile.MaterialActionType.LOAD
      ),
      mergeMap((Actions : ActionsFile.LoadMaterial)=>
      this.service.getAll().pipe(
                map((data : Material[])=>new ActionsFile.LoadMaterialSuccess(data)),
                catchError(err =>of(new ActionsFile.LoadMaterialFail(err)))
           )
      )
  )

   //Create Material Category

   @Effect()
   CreateMaterial$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.CreateMaterial>(
           ActionsFile.MaterialActionType.CREATE,
       ),
       map((Actions : ActionsFile.CreateMaterial)=>Actions.payload),
       mergeMap((MaterialCateg : Material )=>
       this.service.add(MaterialCateg ).pipe(
           map(
               (NewMaterialCats : Material)=>
               new ActionsFile.CreateMaterialSuccess(NewMaterialCats,this.router)
           ),
           catchError(err =>of(new ActionsFile.CreateMaterialFail(err)))
       )
       )
   );
 
   //Update MaterialCategory
 
//    @Effect()
//    UpdateMaterial$: Observable<Action> = this.actions$.pipe(
//        ofType<ActionsFile.UpdateMaterial>(
//            ActionsFile.MaterialActionType.UPDATE_Material
//        ),
//        map((Actions : ActionsFile.UpdateMaterial)=>Actions.payload),
//        mergeMap((MaterialCateg : Material )=>
//        this.MaterialServ. updateMaterial(MaterialCateg ).pipe(
//            map(
//                (updateMaterialCats : Material)=>
//                new ActionsFile.CreateMaterialSuccess({
//                    id:updateMaterialCats.id,
//                    name:updateMaterialCats.name,
//                    remark:updateMaterialCats.remark,
//                }),
//            catchError(err =>of(new ActionsFile.UpdateMaterialCatFail(err)))
//        )
//        )
//    ));
 
    //Delete Material Category
 
    @Effect()
    DeleteMaterial$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.DeleteMaterial>(
            ActionsFile.MaterialActionType.DELETE
        ),
        map((Actions : ActionsFile.DeleteMaterial)=>Actions.payload),
        mergeMap((id:string)=>
        this.service.delete(id).pipe(
            map(()=>new ActionsFile.DeleteMaterialSuccess()),
            catchError(err =>of(new ActionsFile.DeleteMaterialFail(err)))
        )
        )
    );
 }
 