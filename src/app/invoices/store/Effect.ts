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
 
//    @Effect()
//    UpdateInvoice$: Observable<Action> = this.actions$.pipe(
//        ofType<ActionsFile.UpdateInvoice>(
//            ActionsFile.InvoiceActionType.UPDATE_Invoice
//        ),
//        map((Actions : ActionsFile.UpdateInvoice)=>Actions.payload),
//        mergeMap((InvoiceCateg : Invoice )=>
//        this.InvoiceServ. updateInvoice(InvoiceCateg ).pipe(
//            map(
//                (updateInvoiceCats : Invoice)=>
//                new ActionsFile.CreateInvoiceSuccess({
//                    id:updateInvoiceCats.id,
//                    name:updateInvoiceCats.name,
//                    remark:updateInvoiceCats.remark,
//                }),
//            catchError(err =>of(new ActionsFile.UpdateInvoiceCatFail(err)))
//        )
//        )
//    ));
 
    //Delete Invoice Category
 
    @Effect()
    DeleteInvoice$: Observable<Action> = this.actions$.pipe(
        ofType<ActionsFile.DeleteInvoice>(
            ActionsFile.InvoiceActionType.DELETE
        ),
        map((Actions : ActionsFile.DeleteInvoice)=>Actions.payload),
        mergeMap((id:string)=>
        this.InvoiceServ.delete(id).pipe(
            map(()=>new ActionsFile.DeleteInvoiceSuccess()),
            catchError(err =>of(new ActionsFile.DeleteInvoiceFail(err)))
        )
        )
    );
 }
 