
import { Store, Action } from '@ngrx/store'
import { HospitalCat } from '../hospitalCat.model';
import { Update } from '@ngrx/entity';
 
export enum HospitalCatActionType {
    LOAD_HospitalCat = "[HospitalCat] load HospitalCat",
    LOAD_HospitalCat_SUCCESS = "[HospitalCat] LOAD HospitalCat Success",
    LOAD_HospitalCat_FAIL = "[HospitalCat] Load HospitalCat Fail ",
    AddAll = "AddAll",
     
    CREATE_HospitalCat = "[HospitalCat] Create HospitalCat",
    CREATE_HospitalCat_SUCCESS = "[HospitalCat] Create HospitalCat Success",
    CREATE_HospitalCat_FAIL = "[HospitalCat] Create HospitalCat Fail ",

    UPDATE_HospitalCat = "[HospitalCat] Update HospitalCat",
    UPDATE_HospitalCat_SUCCESS = "[HospitalCat] Update HospitalCat Success",
    UPDATE_HospitalCat_FAIL = "[HospitalCat] Update HospitalCat Fail ",

    DELETE_HospitalCat = "[HospitalCat] Delete HospitalCat",
    DELETE_HospitalCat_SUCCESS = "[HospitalCat] Delete HospitalCat Success",
    DELETE_HospitalCat_FAIL = "[HospitalCat] Delete HospitalCat Fail ",
}

export class LoadHospitalCat implements Action{
    readonly type = HospitalCatActionType.LOAD_HospitalCat
}
export class LoadHospitalCatSuccess implements Action{
    readonly type = HospitalCatActionType.LOAD_HospitalCat_SUCCESS;

 constructor(public payload: HospitalCat[]){ }

}
export class LoadHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.LOAD_HospitalCat_FAIL
    constructor(public payload: string){}
}

// Add HospitalCategory

export class CreateHospitalCat implements Action{
    readonly type = HospitalCatActionType.CREATE_HospitalCat;
 constructor(public payload: HospitalCat){}

}
export class CreateHospitalCatSuccess implements Action{
    readonly type = HospitalCatActionType.CREATE_HospitalCat_SUCCESS;

 constructor(public payload: HospitalCat){}

}
export class CreateHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.CREATE_HospitalCat_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory

export class UpdateHospitalCat implements Action{
 readonly type = HospitalCatActionType.UPDATE_HospitalCat;
 constructor(public payload: HospitalCat){     
    console.log("Action Update",payload);
 }

}
export class UpdateHospitalCatSuccess implements Action{

    readonly type = HospitalCatActionType.UPDATE_HospitalCat_SUCCESS;
    constructor(public payload: Update<HospitalCat>){        
       console.log("Action update success",payload);
    }

}
export class UpdateHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.UPDATE_HospitalCat_FAIL
    constructor(public payload: string){
       console.log("Action update fail",payload);
    }
}

// delete HospitalCategory

export class DeleteHospitalCat implements Action{
    readonly type = HospitalCatActionType.DELETE_HospitalCat;
    constructor(public payload: string){}
}
export class DeleteHospitalCatSuccess implements Action{
    readonly type = HospitalCatActionType.DELETE_HospitalCat_SUCCESS;

 constructor(public payload: string){}

}
export class DeleteHospitalCatFail implements Action{
    readonly type = HospitalCatActionType.DELETE_HospitalCat_FAIL
    constructor(public payload: string){}
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