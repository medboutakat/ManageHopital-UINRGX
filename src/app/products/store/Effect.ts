import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import * as ActionsFile from 'src/app/Products/store/Action'
import { ProductService } from '../Product.service';
import { Product } from '../product.Module';

@Injectable()
export class ProductEffect {
    constructor(private actions$: Actions,
        private ProductServ: ProductService) {
    }

    @Effect()
    LoadProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.Load>(
            ActionsFile.ProductActionType.LOAD
        ),
        mergeMap((Actions: ActionsFile.Load) =>
            this.ProductServ.getAll().pipe(
                map(
                    (Products: Product[]) =>
                        new ActionsFile.LoadSuccess(Products)
                ),
                catchError(err => of(new ActionsFile.LoadFail(err)))
            )
        )
    )

    @Effect()
    LoadOneProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.LoadOne>(
            ActionsFile.ProductActionType.LOAD_ONE
        ),
        mergeMap((action: ActionsFile.LoadOne) =>
            this.ProductServ.getById(action.payload).pipe(
                map(
                    (Product: Product) =>
                        new ActionsFile.LoadOneSuccess(Product)
                ),
                catchError(err => of(new ActionsFile.LoadOneFail(err)))
            )
        )
    )

    //Create Product Category

    @Effect()
    CreateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.Create>(
            ActionsFile.ProductActionType.CREATE
        ),
        map((Actions: ActionsFile.Create) => Actions.payload),
        mergeMap((ProductCateg: Product) =>
            this.ProductServ.add(ProductCateg).pipe(
                map(
                    (NewProductCats: Product) =>
                        new ActionsFile.CreateSuccess(NewProductCats)
                ),
                catchError(err => of(new ActionsFile.CreateFail(err)))
            )
        )
    );

    //Update ProductCategory

    @Effect()
    UpdateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.Update>(
            ActionsFile.ProductActionType.UPDATE
        ),
        map((Actions: ActionsFile.Update) => Actions.payload),
        mergeMap((Product: Product) =>
            this.ProductServ.update(Product).pipe(
                map(
                    (updateProduct: Product) =>
                        new ActionsFile.UpdateSuccess({
                            id: updateProduct.id,
                            changes: updateProduct
                        }),
                    catchError(err => of(new ActionsFile.UpdateFail(err)))
                )
            )
        ));

    //Delete Product Category

    @Effect()
    DeleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.Delete>(
            ActionsFile.ProductActionType.DELETE
        ),
        map((Actions: ActionsFile.Delete) => Actions.payload),
        mergeMap((id: string) =>
            this.ProductServ.delete(id).pipe(
                map(() => new ActionsFile.DeleteSuccess(id)),
                catchError(err => of(new ActionsFile.DeleteFail(err)))
            )
        )
    );
}
