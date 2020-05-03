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
        ofType<ActionsFile.LoadProduct>(
            ActionsFile.ProductActionType.LOAD
        ),
        mergeMap((Actions: ActionsFile.LoadProduct) =>
            this.ProductServ.getAll().pipe(
                map(
                    (ProductCats: Product[]) =>
                        new ActionsFile.LoadProductSuccess(ProductCats)
                ),
                catchError(err => of(new ActionsFile.LoadProductFail(err)))
            )
        )
    )

    @Effect()
    LoadOneProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.LoadOneProduct>(
            ActionsFile.ProductActionType.LOAD_ONE
        ),
        mergeMap((action: ActionsFile.LoadOneProduct) =>
            this.ProductServ.getById(action.payload).pipe(
                map(
                    (Product: Product) =>
                        new ActionsFile.LoadOneProductSuccess(Product)
                ),
                catchError(err => of(new ActionsFile.LoadOneProductFail(err)))
            )
        )
    )

    //Create Product Category

    @Effect()
    CreateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.CreateProduct>(
            ActionsFile.ProductActionType.CREATE
        ),
        map((Actions: ActionsFile.CreateProduct) => Actions.payload),
        mergeMap((ProductCateg: Product) =>
            this.ProductServ.add(ProductCateg).pipe(
                map(
                    (NewProductCats: Product) =>
                        new ActionsFile.CreateProductSuccess(NewProductCats)
                ),
                catchError(err => of(new ActionsFile.CreateProductFail(err)))
            )
        )
    );

    //Update ProductCategory

    @Effect()
    UpdateProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.UpdateProduct>(
            ActionsFile.ProductActionType.UPDATE
        ),
        map((Actions: ActionsFile.UpdateProduct) => Actions.payload),
        mergeMap((Product: Product) =>
            this.ProductServ.update(Product).pipe(
                map(
                    (updateProduct: Product) =>
                        new ActionsFile.UpdateProductSuccess({
                            id: updateProduct.id,
                            changes: updateProduct
                        }),
                    catchError(err => of(new ActionsFile.UpdateProductFail(err)))
                )
            )
        ));

    //Delete Product Category

    @Effect()
    DeleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.DeleteProduct>(
            ActionsFile.ProductActionType.DELETE
        ),
        map((Actions: ActionsFile.DeleteProduct) => Actions.payload),
        mergeMap((id: string) =>
            this.ProductServ.delete(id).pipe(
                map(() => new ActionsFile.DeleteProductSuccess(id)),
                catchError(err => of(new ActionsFile.DeleteProductFail(err)))
            )
        )
    );
}
