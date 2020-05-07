
import { Store, Action } from '@ngrx/store'
import { HospitalCat as Model} from '../hospitalCat.model';

export enum HospitalCatActionType {
    LOAD = "[Model] load HospitalCat",
    LOAD_SUCCESS = "[Model] LOAD HospitalCat Success",
    LOAD_FAIL = "[Model] Load HospitalCat Fail ",
    AddAll = "AddAll",

    CREATE = "[Model] Create HospitalCat",
    CREATE_SUCCESS = "[Model] Create HospitalCat Success",
    CREATE_FAIL = "[Model] Create HospitalCat Fail ",

    UPDATE = "[Model] Update HospitalCat",
    UPDATE_SUCCESS = "[Model] Update HospitalCat Success",
    UPDATE_FAIL = "[Model] Update HospitalCat Fail ",

    DELETE = "[Model] Delete HospitalCat",
    DELETE_SUCCESS = "[Model] Delete HospitalCat Success",
    DELETE_FAIL = "[Model] Delete HospitalCat Fail ",
}

export class Load implements Action {
    readonly type = HospitalCatActionType.LOAD
}
export class LoadSuccess implements Action {
    readonly type = HospitalCatActionType.LOAD_SUCCESS;

    constructor(public payload: Model[]) { }

}
export class LoadFail implements Action {
    readonly type = HospitalCatActionType.LOAD_FAIL
    constructor(public payload: string) { }
}

// Add HospitalCategory

export class Create implements Action {
    readonly type = HospitalCatActionType.CREATE;
    constructor(public payload: Model) { }

}
export class CreateSuccess implements Action {
    readonly type = HospitalCatActionType.CREATE_SUCCESS;
    constructor(public payload: Model) { }
}
export class CreateFail implements Action {
    readonly type = HospitalCatActionType.CREATE_FAIL
    constructor(public payload: string) { }
}

//Update hospitalCategory
export class Update implements Action {
    readonly type = HospitalCatActionType.UPDATE;
    constructor(public payload: Model) {
        console.log("Action Update", payload);
    }
}

export class UpdateSuccess implements Action {
    readonly type = HospitalCatActionType.UPDATE_SUCCESS;
    constructor(public payload: Model) {
        console.log("Action update success=>", payload);
    }
}

export class UpdateFail implements Action {
    readonly type = HospitalCatActionType.UPDATE_FAIL
    constructor(public payload: string) {
        console.log("Action update fail", payload);
    }
}

// delete HospitalCategory

export class Delete implements Action {
    readonly type = HospitalCatActionType.DELETE;
    constructor(public payload: string) { }
}
export class DeleteSuccess implements Action {
    readonly type = HospitalCatActionType.DELETE_SUCCESS;

    constructor(public payload: string) {
        console.log("Action delete success", payload);
    }

}
export class DeleteFail implements Action {
    readonly type = HospitalCatActionType.DELETE_FAIL
    constructor(public payload: string) {
        console.log("Action delete fail", payload);
    }
}

export type HospitalCatAction =
    // Load
    Load |
    LoadSuccess |
    LoadFail
    // Create
    | Create
    | CreateSuccess
    | CreateFail
    //  Update
    | Update
    | UpdateSuccess
    | UpdateFail
    // Delete
    | Delete
    | DeleteSuccess
    | DeleteFail;