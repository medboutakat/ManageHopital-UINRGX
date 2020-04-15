
import { Store, Action } from '@ngrx/store' 
import { Update } from '@ngrx/entity';
import { Invoice } from '../invoice-model';
 
export enum InvoiceActionType {
    LOAD = "[Invoice] load Invoice",
    LOAD_SUCCESS = "[Invoice] LOAD Invoice Success",
    LOAD_FAIL = "[Invoice] Load Invoice Fail ",
    AddAll = "AddAll", 

    CREATE = "[Invoice] Create Invoice",
    CREATE_SUCCESS = "[Invoice] Create Invoice Success",
    CREATE_FAIL = "[Invoice] Create Invoice Fail ",

    UPDATE = "[Invoice] Update Invoice",
    UPDATE_SUCCESS = "[Invoice] Update Invoice Success",
    UPDATE_FAIL = "[Invoice] Update Invoice Fail ",

    DELETE = "[Invoice] Delete Invoice",
    DELETE_SUCCESS = "[Invoice] Delete Invoice Success",
    DELETE_FAIL = "[Invoice] Delete Invoice Fail ",
}

export class LoadInvoice implements Action{
    readonly type = InvoiceActionType.LOAD
}
export class LoadInvoiceSuccess implements Action{
    readonly type = InvoiceActionType.LOAD_SUCCESS;

 constructor(public payload: Invoice[]){ }

}
export class LoadInvoiceFail implements Action{
    readonly type = InvoiceActionType.LOAD_FAIL
    constructor(public payload: string){}
}


// Add InvoiceCategory

export class CreateInvoice implements Action{
    readonly type = InvoiceActionType.CREATE;
 constructor(public payload: Invoice){}

}
export class CreateInvoiceSuccess implements Action{
    readonly type = InvoiceActionType.CREATE_SUCCESS;

 constructor(public payload: Invoice){}

}
export class CreateInvoiceFail implements Action{
    readonly type = InvoiceActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update InvoiceCategory

export class UpdateInvoice implements Action{
    readonly type = InvoiceActionType.UPDATE;
 constructor(public payload: Invoice){}

}
export class UpdateInvoiceSuccess implements Action{
    readonly type = InvoiceActionType.UPDATE_SUCCESS;

 constructor(public payload: Update<Invoice>){}

}
export class UpdateInvoiceFail implements Action{
    readonly type = InvoiceActionType.UPDATE_FAIL
    constructor(public payload: string){}
}

// delete InvoiceCategory

export class DeleteInvoice implements Action{
    readonly type = InvoiceActionType.DELETE;
 constructor(public payload: string){}

}
export class DeleteInvoiceSuccess implements Action{
    readonly type = InvoiceActionType.DELETE_SUCCESS;

    constructor(public payload: string) {}
}

export class DeleteInvoiceFail implements Action{
    readonly type = InvoiceActionType.DELETE_FAIL
    constructor(public payload: string){}
}

export type InvoiceAction=
// LoadInvoiceCat
 LoadInvoice |
 LoadInvoiceSuccess | 
 LoadInvoiceFail
// CreateInvoiceCat
 |CreateInvoice
 | CreateInvoiceSuccess
 |CreateInvoiceFail
//  UpdateInvoiceCat
 |UpdateInvoice
 |UpdateInvoiceSuccess
 |UpdateInvoiceFail
 // DeleteInvoiceCat
 |DeleteInvoice
 |DeleteInvoiceSuccess
 |DeleteInvoiceFail;