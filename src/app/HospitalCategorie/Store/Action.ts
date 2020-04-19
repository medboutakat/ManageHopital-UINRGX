
import { Store, Action } from '@ngrx/store'
import { HospitalCat } from '../hospitalCat.model';
import { Update } from '@ngrx/entity';
 
export enum HospitalCatActionType {
    LOAD = "[HospitalCat] load HospitalCat",
    LOAD_SUCCESS = "[HospitalCat] LOAD HospitalCat Success",
    LOAD_FAIL = "[HospitalCat] Load HospitalCat Fail ",
    AddAll = "AddAll",
     
    CREATE = "[HospitalCat] Create HospitalCat",
    CREATE_SUCCESS = "[HospitalCat] Create HospitalCat Success",
    CREATE_FAIL = "[HospitalCat] Create HospitalCat Fail ",

    UPDATE = "[HospitalCat] Update HospitalCat",
    UPDATE_SUCCESS = "[HospitalCat] Update HospitalCat Success",
    UPDATE_FAIL = "[HospitalCat] Update HospitalCat Fail ",

    DELETE= "[HospitalCat] Delete HospitalCat",
    DELETE_SUCCESS = "[HospitalCat] Delete HospitalCat Success",
    DELETE_FAIL = "[HospitalCat] Delete HospitalCat Fail ",
}

export class LoadHospitalCat implements Action{
    readonly type = HospitalCatActionType.LOAD
}
export class LoadHospitalCatSuccess implements Action{
    readonly type = HospitalCatActionType.LOAD_SUCCESS;

 constructor(public payload: HospitalCat[]){ }

}
export class LoadHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.LOAD_FAIL
    constructor(public payload: string){}
}

// Add HospitalCategory

export class CreateHospitalCat implements Action{
    readonly type = HospitalCatActionType.CREATE;
 constructor(public payload: HospitalCat){}

}
export class CreateHospitalCatSuccess implements Action{
    readonly type = HospitalCatActionType.CREATE_SUCCESS;
    constructor(public payload: HospitalCat){}
}
export class CreateHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.CREATE_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory
export class UpdateHospitalCat implements Action{
 readonly type = HospitalCatActionType.UPDATE;
 constructor(public payload: HospitalCat){     
    console.log("Action Update",payload);
 }
}

export class UpdateHospitalCatSuccess implements Action{
    readonly type = HospitalCatActionType.UPDATE_SUCCESS;
    constructor(public payload: any){        
       console.log("Action update success",payload);
    }
}

export class UpdateHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.UPDATE_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
}

// delete HospitalCategory

export class DeleteHospitalCat implements Action{
    readonly type = HospitalCatActionType.DELETE;
    constructor(public payload: string){}
}
export class DeleteHospitalCatSuccess implements Action{
    readonly type = HospitalCatActionType.DELETE_SUCCESS;

 constructor(public payload: string){
    console.log("Action delete success",payload);
 }

}
export class DeleteHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.DELETE_FAIL
    constructor(public payload: string){
        console.log("Action delete fail",payload);
    }
}

export type HospitalCatAction=
// LoadHospitalCat
 LoadHospitalCat |
 LoadHospitalCatSuccess | 
 LoadHospitalCatFail
// CreateHospitalCat
 |CreateHospitalCat
 | CreateHospitalCatSuccess
 |CreateHospitalCatFail
//  UpdateHospitalCat
 |UpdateHospitalCat
 |UpdateHospitalCatSuccess
 |UpdateHospitalCatFail
 // DeleteHospitalCat
 |DeleteHospitalCat
 |DeleteHospitalCatSuccess
 |DeleteHospitalCatFail;