import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map ,mergeMap,catchError} from 'rxjs/operators';
import {of , Observable} from'rxjs'
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store'
import * as ActionsFile from 'src/app/Invoices/store/Action'
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice-model';

@Injectable()
export class InvoiceEffect {
    constructor(private actions$ : Actions,
        private InvoiceServ : InvoiceService)
   {
   }

  @Effect()
  LoadInvoice$: Observable<Action> = this.actions$.pipe(
      ofType<ActionsFile.LoadInvoice>(
          ActionsFile.InvoiceActionType.LOAD
      ),
      mergeMap((Actions : ActionsFile.LoadInvoice)=>
      this.InvoiceServ.getAll().pipe(
          map(
              (InvoiceCats : Invoice[])=>
              new ActionsFile.LoadInvoiceSuccess(InvoiceCats)
          ),
          catchError(err =>of(new ActionsFile.LoadInvoiceFail(err)))
      )
      )
  )

  @Effect()
  LoadOneInvoice$: Observable<Action> = this.actions$.pipe(
    ofType<ActionsFile.LoadOneInvoice>(
        ActionsFile.InvoiceActionType.LOAD_ONE
      ),
      mergeMap((action: ActionsFile.LoadOneInvoice) =>
        this.InvoiceServ.getById(action.payload).pipe(
          map(
            (invoice: Invoice) =>
              new ActionsFile.LoadOneInvoiceSuccess(invoice)
          ),
          catchError(err => of(new ActionsFile.LoadOneInvoiceFail(err)))
        )
      )
  )

   //Create Invoice Category

   @Effect()
   CreateInvoice$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.CreateInvoice>(
           ActionsFile.InvoiceActionType.CREATE
       ),
       map((Actions : ActionsFile.CreateInvoice)=>Actions.payload),
       mergeMap((InvoiceCateg : Invoice )=>
       this.InvoiceServ.add(InvoiceCateg ).pipe(
           map(
               (NewInvoiceCats : Invoice)=>
               new ActionsFile.CreateInvoiceSuccess(NewInvoiceCats)
           ),
           catchError(err =>of(new ActionsFile.CreateInvoiceFail(err)))
       )
       )
   );
 
   //Update InvoiceCategory
 
   @Effect()
   UpdateInvoice$: Observable<Action> = this.actions$.pipe(
       ofType<ActionsFile.UpdateInvoice>(
           ActionsFile.InvoiceActionType.UPDATE
       ),
       map((Actions : ActionsFile.UpdateInvoice)=>Actions.payload),
       mergeMap((Invoice : Invoice )=>
       this.InvoiceServ.update(Invoice).pipe(
            map(
                (updateInvoice : Invoice)=>
                new ActionsFile.UpdateInvoiceSuccess({
                    id:updateInvoice.id,
                    changes:updateInvoice
                }),
                catchError(err =>of(new ActionsFile.UpdateInvoiceFail(err)))
            )
       )
   ));
 
    //Delete Invoice Category
 
    @Effect()
    DeleteInvoice$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.DeleteInvoice>(
            ActionsFile.InvoiceActionType.DELETE
        ),
        map((Actions : ActionsFile.DeleteInvoice)=>Actions.payload),
        mergeMap((id:string)=>
        this.InvoiceServ.delete(id).pipe(
            map(()=>new ActionsFile.DeleteInvoiceSuccess(id)),
            catchError(err =>of(new ActionsFile.DeleteInvoiceFail(err)))
        )
        )
    );
 }
 